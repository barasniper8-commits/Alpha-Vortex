const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// URL Gambar Tema Cyberpunk Pro
const CYBER_IMAGE_URL = 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800';

// Pesan Sambutan Cyberpunk Pro
const cyberpunkWelcome = `
⚡ <b>[ SYSTEM INITIALIZED: CYBERNETIC_CORE ]</b> ⚡
━━━━━━━━━━━━━━━━━━━━━━━━━━
ACCESS GRANTED // PROTOCOL: SECURE
━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 <b>RDP & AUTOMATION CONTROL INTERFACE</b>
Selamat datang di terminal utama sistem. Silakan pilih menu navigasi di bawah untuk mengakses layanan:

⚙️ <b>SYSTEM STATUS:</b> <code>ONLINE [CYBERPUNK PRO]</code>
`;

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
        caption: cyberpunkWelcome,
        parse_mode: 'HTML',
        ...cyberpunkKeyboard
      }
    );
  } catch (err) {
    console.error(err);
    ctx.reply('⚡ System Error: Gagal memuat interface cyberpunk.');
  }
});

// Handler saat mengirim pesan APAPUN
bot.on('text', async (ctx) => {
  try {
    await ctx.replyWithPhoto(
      { url: CYBER_IMAGE_URL },
      {
        caption: `⚡ <b>[ TERMINAL COMMAND RECEIVED ]</b>\n${cyberpunkWelcome}`,
        parse_mode: 'HTML',
        ...cyberpunkKeyboard
      }
    );
  } catch (err) {
    console.error(err);
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
