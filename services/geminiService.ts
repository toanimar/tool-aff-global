import { GoogleGenAI, Type } from "@google/genai";

export interface Sitelink {
  headline: string;
  description1: string;
  description2: string;
}

export interface AdGroup {
  groupName: string;
  keywords: string[];
  headlines: string[];
  descriptions: string[];
}

export interface GeneratedContent {
  articleHtml: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  urlSlug: string;
  shortDescription: string;
  categories: string[];
  adGroups: AdGroup[];
  sitelinks: Sitelink[];
  callouts: string[];
}


const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const buildPrompt = (rawContent: string): string => {
  return `
You are a world-class Google Ads Search Specialist and SEO Content Analyst for coupon affiliate websites. Your task is to analyze the provided promotional content and generate a complete set of campaign assets in a structured JSON format.

**CRITICAL INSTRUCTION:** You MUST learn from and strictly replicate the structure, tone, and formulas from the examples provided below. First, identify the Brand Name (e.g., "sh fitness", which you will refer to as "[Store]") and the highest discount percentage available (e.g., "50%", which you will refer to as "[%]") from the user's content. Then, inject these values into the templates to generate the final assets.

---
**LEARNING MATERIAL: Successful Campaign Formulas & Structure**
---

**1. Callout Extensions (Mở rộng chú thích):**
*   Generate 4 distinct callouts based on these successful examples.
*   *Examples to learn from:* "100% Working Code", "All Code Verified", "Free Code", "Rate: 4.93 / 5.0".

**2. Sitelink Extensions (Phần mở rộng về đường liên kết trang web):**
*   Generate exactly 3 sitelinks. Each must have a headline (<=25 chars), description1 (<=35 chars), and description2 (<=35 chars).
*   *Examples to learn from:*
    *   **Sitelink 1 (General):** Headline: "Today's Top Coupon", Desc1: "Provide the best coupons", Desc2: "Rated by the user".
    *   **Sitelink 2 (Deals):** Headline: "Best Deals Of The Days", Desc1: "Sale Up To [%]%", Desc2: "To save your money".
    *   **Sitelink 3 (Blog):** Headline: "All Blog", Desc1: "Save with All Blog coupons", Desc2: "Discounts and promo codes for".

**3. Ad Groups & Their Assets:**
*   You will create TWO distinct ad groups: "Coupon" and "Discount".
*   Each ad group will have its own set of keywords, headlines, and descriptions based on the specific formulas below.

---
**Ad Group 1: "Coupon" Formulas**
---
*   **Keywords (Từ khóa Coupon):**
    *   **CRITICAL RULE FOR KEYWORDS:** The final string for each keyword MUST be wrapped in double quotes for "Phrase Match". For example: "[Store] coupon".
    *   *Generate keywords based on these patterns:*
    *   "[Store] coupon"
    *   "[Store] coupon code"
    *   "[Store] promo code"
    *   "Promo code [Store]"
    *   "Coupon [Store]"
    *   "Coupon code [Store]"
    *   "Coupon code for [Store]"
    *   "Coupon for [Store]"
    *   "Promo code for [Store]"
*   **Headlines (Tiêu đề Coupon):** Generate 8 headlines (<= 30 chars) based on these patterns.
    *   [Store] Coupon Code
    *   Best [Store] Coupons
    *   Top [Store] Coupons
    *   Get [%]% Off [Store]
    *   Top Coupon Codes Today
    *   Enjoy Fast Savings [%]% Off
    *   All Codes [Verified]
    *   Save [%]% Off Coupon Code
*   **Descriptions (Mô tả Coupon):** Generate 4 descriptions (<= 90 chars) based on these patterns.
    *   Save [%]% Off on all products with [Store] coupon. All coupons verified
    *   With This Exclusive [Store] Coupon Code, Shop Till You Drop And Enjoy [%]% Off
    *   Saving Your Pocket With [%]% Off Thanks To Special [Store] Coupon. Enjoy It
    *   Get [Store] Promo Code At Checkout And Enjoy [%]% Off. Don't Hesitate Anymore.
    *   [%]% Off [Store] Coupons & Promo Codes 2025
    *   Apply these [Store] Coupon At Checkout And Save. Tested Daily.

---
**Ad Group 2: "Discount" Formulas**
---
*   **Keywords (Từ khóa Discount):**
    *   **CRITICAL RULE FOR KEYWORDS:** The final string for each keyword MUST be wrapped in double quotes for "Phrase Match". For example: "[Store] discount".
    *   *Generate keywords based on these patterns:*
    *   "[Store] discount code"
    *   "[Store] discount"
    *   "Discount code for [Store]"
    *   "Discount [Store]"
    *   "Discount code [Store]"
    *   "[Store] discount coupon"
*   **Headlines (Tiêu đề Discount):** Generate 8 headlines (<= 30 chars) based on these patterns.
    *   [Store] Discount Code
    *   Best [Store] Discount
    *   Top [Store] Discount
    *   Get [%]% Off [Store]
    *   Top Discount Codes Today
    *   Enjoy Fast Savings [%]% Off
    *   All Codes [Verified]
    *   Save [%]% Off Discount Code
*   **Descriptions (Mô tả Discount):** Generate 4 descriptions (<= 90 chars) based on these patterns.
    *   Save [%]% Off on all products with [Store] discount. All coupons verified
    *   With This Exclusive [Store] Discount Code, Shop Till You Drop And Enjoy [%]% Off
    *   Saving Your Pocket With [%]% Off Thanks To Special [Store] Discount. Enjoy It
    *   Get [Store] Promo Code At Checkout And Enjoy [%]% Off. Don't Hesitate Anymore.
    *   [%]% Off [Store] Discount & Promo Codes 2025
    *   Apply these [Store] Discount At Checkout And Save [%]%. Tested Daily.

---
**GLOBAL REQUIREMENTS FOR ALL ASSETS:**
*   **Capitalization:** Capitalize The First Letter Of Each Word.
*   **Symbols:** Do NOT use special symbols like !, ?, etc., unless explicitly shown in the examples (e.g., [Verified]).
*   **CTA:** Ensure a clear Call-To-Action is present in descriptions.
*   **JSON Output:** The final output must be a single, valid JSON object with no extra text or markdown.

---
**ADDITIONAL ASSETS (SEO & ARTICLE)**
---
In the same JSON object, also provide:
*   'articleHtml': A full, ready-to-publish article in HTML using modern, clean inline CSS. **Crucially, the FAQ section must be interactive (accordion style).** Use the example below as a strict template for the FAQ section. Each question should be a button that, when clicked, reveals the answer.
    *   **HTML Structure & Style Guide:**
        *   **General:** \`font-family: sans-serif; color: #333; line-height: 1.6;\`
        *   **Headers (h1, h2):** \`color: #A52A2A;\` (Maroon)
        *   **Coupon Box:** \`border: 2px dashed #A52A2A; padding: 15px; margin: 20px 0; background-color: #f9f9f9;\`
        *   **CTA Button:** \`background-color: #DC3545; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; font-weight: bold;\`
    *   **Interactive FAQ Template (MUST be replicated):**
        \`` + "```" + `html
        <h2 style="color: #A52A2A;">VI. Frequently Asked Questions (FAQ)</h2>
        <div class="faq-container">
          <!-- FAQ Item 1 -->
          <div class="faq-item" style="margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
            <button onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'; this.querySelector('span:last-child').textContent = this.nextElementSibling.style.display === 'none' ? '+' : '-';" style="width: 100%; text-align: left; background: none; border: none; font-size: 16px; font-weight: bold; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 10px 0;">
              <span>Q: What makes Asorock watches unique?</span>
              <span style="font-size: 20px; font-weight: bold;">+</span>
            </button>
            <div class="faq-answer" style="display: none; margin-top: 10px; padding-left: 10px; color: #555;">
              <p style="margin: 0;">A: Asorock is a pioneering African-founded luxury brand with a direct social mission. Every customer's name is engraved on a pillar in the library complexes they help fund, creating a permanent link between your purchase and its positive impact.</p>
            </div>
          </div>
          <!-- FAQ Item 2 -->
          <div class="faq-item" style="margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
            <button onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'; this.querySelector('span:last-child').textContent = this.nextElementSibling.style.display === 'none' ? '+' : '-';" style="width: 100%; text-align: left; background: none; border: none; font-size: 16px; font-weight: bold; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 10px 0;">
              <span>Q: What is the warranty on Asorock products?</span>
              <span style="font-size: 20px; font-weight: bold;">+</span>
            </button>
            <div class="faq-answer" style="display: none; margin-top: 10px; padding-left: 10px; color: #555;">
              <p style="margin: 0;">A: All Asorock products... are backed by a comprehensive 24-Month Warranty.</p>
            </div>
          </div>
        </div>
        ` + "```" + `
*   'metaTitle': SEO-optimized title, under 60 characters.
*   'metaDescription': Compelling summary, under 160 characters.
*   'keywords': An array of exactly 5 relevant SEO keywords for the article.
*   'urlSlug': A lowercase, hyphenated, SEO-friendly URL slug.
*   'shortDescription': A one-sentence summary for previews.
*   'categories': An array of relevant product categories extracted from the content.

---
**USER'S PROMOTIONAL CONTENT TO ANALYZE:**
"${rawContent}"
  `;
};


export const generateAffiliateArticle = async (rawContent: string): Promise<GeneratedContent> => {
  const prompt = buildPrompt(rawContent);
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            articleHtml: { type: Type.STRING },
            metaTitle: { type: Type.STRING },
            metaDescription: { type: Type.STRING },
            keywords: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            urlSlug: { type: Type.STRING },
            shortDescription: { type: Type.STRING },
            categories: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            adGroups: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  groupName: { type: Type.STRING },
                  keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                  headlines: { type: Type.ARRAY, items: { type: Type.STRING } },
                  descriptions: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["groupName", "keywords", "headlines", "descriptions"]
              }
            },
            sitelinks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  headline: { type: Type.STRING },
                  description1: { type: Type.STRING },
                  description2: { type: Type.STRING },
                },
                required: ["headline", "description1", "description2"]
              }
            },
            callouts: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["articleHtml", "metaTitle", "metaDescription", "keywords", "urlSlug", "shortDescription", "categories", "adGroups", "sitelinks", "callouts"],
        },
      },
    });
    
    const responseText = response.text.trim();
    let parsedJson = JSON.parse(responseText);

    // Basic validation
    if (!parsedJson.articleHtml || !Array.isArray(parsedJson.adGroups) || !Array.isArray(parsedJson.sitelinks)) {
        throw new Error("Generated JSON is missing required fields or has incorrect types.");
    }
    
    // GUARANTEED FIX: Replace placeholder with double quotes for all keywords
    // The AI is instructed to generate keywords with quotes already, but this is a fallback.
    if (parsedJson.adGroups) {
      parsedJson.adGroups.forEach((group: AdGroup) => {
        if (group.keywords && Array.isArray(group.keywords)) {
          group.keywords = group.keywords.map((kw: string) => {
            const trimmedKw = kw.trim().replace(/^"|"$/g, ''); // Remove existing quotes just in case
            return `"${trimmedKw}"`; // Add quotes
          });
        }
      });
    }


    return parsedJson as GeneratedContent;

  } catch (error) {
    console.error("Error calling Gemini API or parsing response:", error);
    if (error instanceof Error) {
        throw error; // Re-throw the original error to be handled by the App component
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
};