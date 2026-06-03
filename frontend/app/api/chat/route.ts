import { NextRequest } from "next/server";

export const runtime = "edge";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Mock chat endpoint cho trợ lý TƯ VẤN DỊCH VỤ VUI CHƠI tại VinWonders.
 * Stream phản hồi từng token để UI có hiệu ứng gõ chữ. Khi tích hợp thật,
 * thay phần generateReply bằng lời gọi tới LLM + dữ liệu vé/lịch diễn thực tế.
 */
function generateReply(messages: ChatMessage[]): string {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const text = lastUser?.content.trim() ?? "";
  const t = text.toLowerCase();

  // Chào hỏi
  if (/^(xin chào|hello|hi|chào|alo)/i.test(text)) {
    return "Xin chào! Mình là trợ lý VinWonders. Bạn đang lên kế hoạch đi chơi à? Cho mình biết đi mấy người, có trẻ nhỏ không và thích loại trò chơi nào nhé.";
  }

  // Vé & giá
  if (/vé|giá|bao nhiêu|combo|ưu đãi|khuyến mãi|trẻ em|người lớn/i.test(t)) {
    return [
      "Các loại vé tham khảo tại VinWonders:",
      "• Vé người lớn: ~880.000đ/người (vào cửa + hầu hết trò chơi).",
      "• Vé trẻ em (1m–1m4): ~660.000đ. Trẻ dưới 1m và người trên 60 tuổi thường được miễn/giảm.",
      "• Combo gia đình & combo nhiều ngày: tiết kiệm hơn nếu đi đông hoặc ở lại lâu.",
      "",
      "Bạn đi mấy người lớn, mấy trẻ em để mình gợi ý combo hợp lý nhất? (Giá có thể thay đổi theo mùa — nên kiểm tra app/website chính thức trước khi mua.)",
    ].join("\n");
  }

  // Lịch trình theo nhóm (gia đình/trẻ nhỏ)
  if (/lịch trình|lịch chơi|gia đình|trẻ nhỏ|trẻ em|1 ngày|một ngày|kế hoạch|đi chơi/i.test(t)) {
    return [
      "Gợi ý lịch trình 1 ngày cho gia đình có trẻ nhỏ:",
      "09:00 – Vào cổng, dạo công viên & chụp ảnh khu cổng chào.",
      "09:30 – Khu trò chơi trẻ em & nhà banh (nhẹ nhàng cho bé).",
      "11:00 – Thủy cung / khu thú để bé khám phá.",
      "12:00 – Ăn trưa tại khu ẩm thực trung tâm.",
      "14:00 – Công viên nước (mang theo đồ bơi).",
      "16:30 – Xem show biểu diễn chính.",
      "18:00 – Mua quà lưu niệm rồi ra về.",
      "",
      "Bạn muốn mình điều chỉnh theo độ tuổi của bé hoặc thêm trò cảm giác mạnh cho người lớn không?",
    ].join("\n");
  }

  // Trò chơi cảm giác mạnh
  if (/cảm giác mạnh|tàu lượn|mạo hiểm|thử thách|đáng thử|trò chơi|nổi bật/i.test(t)) {
    return [
      "Vài trò cảm giác mạnh được yêu thích:",
      "• Tàu lượn siêu tốc — tốc độ cao, nhiều vòng xoắn.",
      "• Tháp rơi tự do — cảm giác hẫng cực mạnh.",
      "• Đu quay khổng lồ — ngắm toàn cảnh từ trên cao.",
      "",
      "Lưu ý: các trò này thường yêu cầu chiều cao tối thiểu (~1m3–1m4) và không phù hợp với người có bệnh tim mạch, huyết áp hoặc phụ nữ mang thai. Bạn muốn mình gợi ý thứ tự chơi để đỡ phải xếp hàng không?",
    ].join("\n");
  }

  // Giờ mở cửa & lịch diễn
  if (/giờ|mở cửa|đóng cửa|lịch diễn|show|biểu diễn|thời gian/i.test(t)) {
    return [
      "Thông tin giờ giấc tham khảo:",
      "• Giờ mở cửa: thường 09:00 – 21:00 (có thể đổi theo mùa/sự kiện).",
      "• Show chính: thường có suất buổi chiều (~16:30) và show nhạc nước buổi tối (~19:30).",
      "",
      "Mình khuyên đến sớm lúc mở cửa để chơi các trò hot trước khi đông. Bạn dự định đi ngày nào để mình lưu ý thêm về thời tiết và sự kiện đặc biệt?",
    ].join("\n");
  }

  // Ăn uống
  if (/ăn|uống|nhà hàng|đồ ăn|ẩm thực|đói|nghỉ/i.test(t)) {
    return [
      "Trong VinWonders có nhiều lựa chọn ăn uống:",
      "• Khu ẩm thực trung tâm: cơm, mì, gà rán, đồ ăn nhanh.",
      "• Quầy ăn vặt rải rác: kem, trà sữa, bắp rang, xúc xích.",
      "• Nhà hàng buffet cho nhóm đông.",
      "",
      "Bạn nên mang theo nước và đồ ăn nhẹ cho bé. Cần mình gợi ý chỗ ăn gần một khu trò chơi cụ thể không?",
    ].join("\n");
  }

  // Mặc định
  return `Mình đã nhận được: "${text}". Mình là trợ lý tư vấn dịch vụ vui chơi tại VinWonders — có thể tư vấn vé, trò chơi, lịch diễn, ăn uống và lên lịch trình. Bạn muốn bắt đầu với phần nào?`;
}

export async function POST(req: NextRequest) {
  let messages: ChatMessage[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const reply = generateReply(messages);
  const tokens = reply.split(/(\s+)/);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (const token of tokens) {
        controller.enqueue(encoder.encode(token));
        await new Promise((r) => setTimeout(r, 30));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
