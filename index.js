
const { Telegraf, Markup } = require('telegraf');

// Inisialisasi Bot dengan Token dari GitHub Secrets (process.env.BOT_TOKEN)
const bot = new Telegraf(process.env.BOT_TOKEN);

// URL Gambar Admin / Profil (Bisa diganti dengan link gambar Anda sendiri)
const ADMIN_IMAGE_URL = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhmN4r8QQGWBuwdrDIE14cm92glQ6NGb20JY9-3fQ-fqBA4tMU5jCnqT-IGypusofrW6mHYJ4_SfTl0mehMAwKf1hI_rbDz_XUxRLfhQG0wZ_Zutv14soi931Rx1tR6bRafIaCp0oGpTc2dYShTbHJWHKbKrosZRMUwHG5i0wl25-f3B4wNZPT1nkdRdO0/s1600/1000184069.jpg';

// Format Pesan Selamat Datang & Info Admin (Mendukung HTML)
const welcomeMessage = `
<b>👋 Selamat Datang di Bot Resmi Admin!</b>

Berikut adalah informasi kontak & panduan layanan kami:

👤 <b>Admin Utama:</b> @username_admin
⏰ <b>Jam Operasional:</b> 08:00 - 22:00 WIB
📌 <b>Status:</b> <code>Online</code>

✨ <b>Layanan yang Tersedia:</b>
• Konsultasi & Layanan Bantuan
• Informasi Produk & Pendaftaran
• Layanan Pengaduan

<i>Silakan klik tombol di bawah untuk menghubungi Admin langsung!</i>
`;

// Handler Perintah /start
bot.start(async (ctx) => {
  try {
    // Kirim Foto + Caption Info + Tombol Inline
    await ctx.replyWithPhoto(
      { url: ADMIN_IMAGE_URL },
      {
        caption: welcomeMessage,
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [
            Markup.button.url('💬 Chat Admin', 'https://t.me/username_admin'),
            Markup.button.url('📢 Channel Info', 'https://t.me/telegram')
          ],
          [
            Markup.button.callback('ℹ️ Bantuan', 'btn_help')
          ]
        ])
      }
    );
  } catch (error) {
    console.error('Gagal mengirim pesan start:', error);
    ctx.reply('Maaf, terjadi kesalahan saat memuat info admin.');
  }
});

// Response saat tombol "Bantuan" diklik
bot.action('btn_help', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('Gunakan tombol "Chat Admin" di atas untuk terhubung langsung dengan tim kami.');
});

// Jalankan Bot
bot.launch().then(() => {
  console.log('🤖 Bot Telegram berhasil berjalan!');
});

// Penanganan graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
