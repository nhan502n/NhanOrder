import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, name, token } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Xác nhận tài khoản",
      html: `<p>Chào ${name}, nhấn vào <a href="${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}">đây</a> để xác nhận tài khoản.</p>`,
    });

    return NextResponse.json({ message: "Email đã gửi" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi gửi email" }, { status: 500 });
  }
}
