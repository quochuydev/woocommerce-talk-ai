import Anthropic from '@anthropic-ai/sdk'
import { AIProvider, AIRequest, AIResponse, StoreInfo } from '@/types/ai'
import { Product } from '@/types/product'
import { Message } from '@/types/message'

const SYSTEM_PROMPT = `You are a friendly and knowledgeable e-commerce shopping assistant. Your role is to help customers find products, answer questions about store policies, and provide excellent customer service.

Guidelines:
- Be conversational, helpful, and concise
- When recommending products, focus on the customer's needs and preferences
- Provide accurate information about store policies when asked
- If you don't know something, admit it rather than making up information
- Be proactive in suggesting relevant products based on the conversation
- Keep responses brief but informative (2-3 sentences typically)`

export class ClaudeProvider implements AIProvider {
  private anthropic: Anthropic

  constructor(apiKey: string) {
    this.anthropic = new Anthropic({ baseURL: 'https://api.z.ai/api/anthropic', apiKey })
  }

  async generateResponse(request: AIRequest): Promise<AIResponse> {
    const systemPrompt = this.buildSystemPrompt(request.storeContext, request.relevantProducts)
    const messages = this.formatMessages(request.conversationHistory)

    const response = await this.anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages,
    })

    const content = response.content[0].type === 'text' ? response.content[0].text : ''
    console.log('content', content)

    return {
      content,
      model: response.model,
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
    }
  }

  async generateStreamResponse(request: AIRequest, onChunk: (text: string) => void): Promise<AIResponse> {
    const systemPrompt = this.buildSystemPrompt(request.storeContext, request.relevantProducts)
    const messages = this.formatMessages(request.conversationHistory)

    const stream = await this.anthropic.messages.stream({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages,
    })

    let fullContent = ''
    let tokensUsed = 0

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        fullContent += chunk.delta.text
        onChunk(chunk.delta.text)
      }
      if (chunk.type === 'message_stop') {
        const message = await stream.finalMessage()
        tokensUsed = message.usage.input_tokens + message.usage.output_tokens
      }
    }

    console.log('fullContent', fullContent)

    return {
      content: fullContent,
      model: 'claude-3-5-sonnet-20241022',
      tokensUsed,
    }
  }

  private buildSystemPrompt(store: StoreInfo, products?: Product[]): string {
    let prompt = SYSTEM_PROMPT

    prompt += `\n\n## Store Information:\n`
    prompt += `Name: ${store.name}\n`
    prompt += `Description: ${store.description}\n`
    if (store.hours) prompt += `Hours: ${store.hours}\n`
    if (store.locations) prompt += `Locations: ${store.locations.join(', ')}\n`

    if (store.policies) {
      prompt += `\n## Store Policies:\n`
      Object.entries(store.policies).forEach(([key, value]) => {
        if (value) prompt += `${key}: ${value}\n`
      })
    }

    if (products && products.length > 0) {
      prompt += `\n## Relevant Products for this conversation:\n`
      products.forEach((p) => {
        prompt += `\n- ${p.title}\n`
        prompt += `  Price: ${p.price}\n`
        if (p.description) prompt += `  Description: ${p.description}\n`
        if (p.inStock !== undefined) prompt += `  In Stock: ${p.inStock ? 'Yes' : 'No'}\n`
        if (p.rating) prompt += `  Rating: ${p.rating}/5 (${p.reviews || 0} reviews)\n`
      })
    }

    return prompt
  }

  private formatMessages(history: Message[]): Anthropic.MessageParam[] {
    return history
      .filter((m) => m.type === 'text' && !m.error)
      .map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
        content: m.content,
      }))
  }
}
