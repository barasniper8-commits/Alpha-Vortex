const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// URL Gambar Tema Cyberpunk Pro
const CYBER_IMAGE_URL = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyXdBxoMyhb5juk8wG1w95vF5HK42SvvvTBhmGcmjphTSU2amlHfcgemfQ_8s19UeibTTwkr_4iOlcEYDZsEcgX6TZ9vi6FeaCYpTwx38F_fqzeTG-Vu8qcdgjLq32Lo6oiwj0f81X75trYVIw6VURTkYcwNe4Pk_j_HxluE-dSD-TtCKO7bQP5HRdhZ8/w1684-h1069-p-k-no-nu/1000186620.png';

// Function Dinamis untuk Membuat Pesan Sambutan Cyberpunk (Menggunakan ctx)
function getWelcomeMessage(ctx) {
  const userName = ctx.from && ctx.from.first_name ? ctx.from.first_name : 'Agent';
  return `

WELCOME AGENT <b>${userName}</b> 🕵️‍♂️!

━━━━━━━━━━━━━━━━━━━━━━
🎮 <b>PANEL INSTRUKSI RDP:</b>
1️⃣ 🚀 Jalankan Workflow <b>Windows RDP Cyberpunk</b>
2️⃣ 🔐 Masukkan Passcode, User, Pass & Auth Key
3️⃣ 📥 IP & Akses RDP dikirim otomatis ke chat ini!

━━━━━━━━━━━━━━━━━━━━━━
`;
}

// 6 Tombol Menu Cyberpunk
const cyberpunkKeyboard = Markup.inlineKeyboard([
  [Markup.button.callback('🛡️ ADMIN', 'menu_admin'), Markup.button.callback('⚡ RDP FREE', 'menu_rdp_free')],
  [Markup.button.callback('💎 RDP BUY', 'menu_rdp_buy'), Markup.button.callback('🔑 PASSKODE', 'menu_passkode')],
  [Markup.button.callback('ℹ️ INFO', 'menu_info'), Markup.button.callback('🤖 BOT', 'menu_bot')]
]);

// Handler Perintah /start
bot.start(async (ctx) => {
  try {
    await ctx.replyWithPhoto(
      { url: CYBER_IMAGE_URL },
      {
        caption: getWelcomeMessage(ctx),
        parse_mode: 'HTML',
        ...cyberpunkKeyboard
      }
    );
  } catch (err) {
    console.error('Error saat /start:', err);
    ctx.reply('⚡ System Error: Gagal memuat interface cyberpunk.');
  }
});

// Handler saat mengirim pesan teks APAPUN
bot.on('text', async (ctx) => {
  try {
    await ctx.replyWithPhoto(
      { url: CYBER_IMAGE_URL },
      {
        caption: `⚡ <b>[ TERMINAL COMMAND RECEIVED ]</b>\n${getWelcomeMessage(ctx)}`,
        parse_mode: 'HTML',
        ...cyberpunkKeyboard
      }
    );
  } catch (err) {
    console.error('Error saat respon teks:', err);
  }
});

// Aksi Tombol 1: ADMIN
bot.action('menu_admin', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('🛡️ <b>ADMIN CONTACT:</b>\nSilakan hubungi admin utama melalui link berikut:\n🔗 https://t.me/Arianto2508', { parse_mode: 'HTML' });
});

// Aksi Tombol 2: RDP FREE
bot.action('menu_rdp_free', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('⚡ <b>RDP FREE STATUS:</b>\nSlot server RDP gratis akan diperbarui secara berkala di channel info. Pastikan selalu memantau pembaruan sistem!', { parse_mode: 'HTML' });
});

// Aksi Tombol 3: RDP BUY
bot.action('menu_rdp_buy', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('💎 <b>RDP BUY / PREMIUM:</b>\nDapatkan akses server RDP kecepatan tinggi bergaransi penuh melalui checkout resmi:', {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([[Markup.button.url('🛒 Beli RDP via Lynk.id', 'https://lynk.id')]])
  });
});

// Aksi Tombol 4: PASSKODE
bot.action('menu_passkode', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('🔑 <b>PASSKODE VERIFICATION:</b>\nMasukkan passkode SHA-256 atau verifikasi melalui halaman tautan resmi sistem.', { parse_mode: 'HTML' });
});

// Aksi Tombol 5: INFO
bot.action('menu_info', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('ℹ️ <b>SYSTEM INFORMATION:</b>\n• Core: Node.js / Telegraf\n• Tema: Cyberpunk Pro UI\n• Status: Secured & Active 24/7', { parse_mode: 'HTML' });
});

// Aksi Tombol 6: BOT
bot.action('menu_bot', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('🤖 <b>BOT SPECIFICATION:</b>\nBot otomatisasi manajemen RDP, panel kontrol, dan integrasi sistem cerdas berbasis cloud.', { parse_mode: 'HTML' });
});

// Jalankan Bot
bot.launch().then(() => {
  console.log('🤖 Cyberpunk Bot berhasil berjalan!');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
