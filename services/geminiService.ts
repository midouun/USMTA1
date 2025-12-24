
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

// Assume process.env.API_KEY is available
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-3-flash-preview';

/**
 * Generates a new discussion topic for law students.
 */
export const generateDiscussionTopic = async (): Promise<{ title: string; content: string }> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: "اقترح موضوع نقاش جديد ومثير للجدل لطلاب كلية الحقوق في الجزائر. يجب أن يكون متعلقًا بالقانون الجزائري الحديث أو التحديات القانونية المعاصرة.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "عنوان موضوع النقاش باللغة العربية.",
            },
            content: {
              type: Type.STRING,
              description: "مقدمة قصيرة لموضوع النقاش، تطرح السؤال الرئيسي أو الإشكالية للنقاش.",
            },
          },
          required: ["title", "content"],
        },
      },
    });
    
    if (response.text) {
        return JSON.parse(response.text);
    }
    throw new Error("No response text from API");

  } catch (error) {
    console.error("Error generating discussion topic:", error);
    return {
      title: "خطأ في إنشاء الموضوع",
      content: "عذرًا، لم نتمكن من إنشاء موضوع جديد في الوقت الحالي. يرجى المحاولة مرة أخرى.",
    };
  }
};

/**
 * Provides research guidance on a given legal topic.
 */
export const generateResearchGuidance = async (topic: string): Promise<string> => {
  const ai = getAI();
  const prompt = `
    بصفتك أستاذًا في القانون، قدم إرشادات مفصلة لطالب حقوق حول كيفية بدء بحث علمي حول الموضوع التالي: "${topic}".
    يجب أن تتضمن الإرشادات ما يلي:
    1.  نقاط رئيسية للبحث.
    2.  منهجية مقترحة (تحليلية، مقارنة، إلخ).
    3.  مصادر ومراجع أساسية يمكن الاعتماد عليها (بدون ذكر روابط، فقط أنواع المصادر مثل: الدستور الجزائري، قانون العقوبات، مقالات أكاديمية، إلخ).
    4.  نصيحة لتجنب السرقات العلمية.
    
    قدم الإجابة باللغة العربية وبتنسيق Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt
    });
    return response.text || "لم يتم العثور على إجابة.";
  } catch (error) {
    console.error("Error generating research guidance:", error);
    return "عذرًا، حدث خطأ أثناء طلب الإرشاد. يرجى المحاولة مرة أخرى.";
  }
};

/**
 * Analyzes a given text for originality and clarity.
 */
export const analyzeTextForOriginality = async (text: string): Promise<string> => {
    const ai = getAI();
    const prompt = `
        قم بتحليل النص التالي من منظور أكاديمي لمساعدة طالب حقوق على تحسين كتابته وضمان الأمانة العلمية. لا تصدر حكمًا حول ما إذا كان النص مسروقًا أم لا، بل قدم ملاحظات بناءة.
        التحليل يجب أن يركز على:
        1.  **وضوح الأسلوب**: هل الأفكار معروضة بوضوح ومنطقية؟
        2.  **أصالة التعبير**: هل هناك جمل أو عبارات شائعة جدًا يمكن إعادة صياغتها بأسلوب شخصي أكثر؟
        3.  **اقتراحات للتحسين**: قدم أمثلة على كيفية إعادة صياغة بعض الجمل لتقوية الحجة أو جعلها أكثر أكاديمية.
        4.  **تذكير بالإسناد**: نبه الطالب بلطف إلى ضرورة إسناد أي أفكار أو معلومات ليست من بنات أفكاره إلى مصادرها الأصلية.

        النص المراد تحليله:
        ---
        ${text}
        ---

        قدم التحليل باللغة العربية وبتنسيق Markdown.
    `;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
        });
        return response.text || "لم نتمكن من تحليل النص.";
    } catch (error) {
        console.error("Error analyzing text:", error);
        return "عذرًا، حدث خطأ أثناء تحليل النص. يرجى المحاولة مرة أخرى.";
    }
};

