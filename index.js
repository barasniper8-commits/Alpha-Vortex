const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// URL Gambar Tema Cyberpunk Pro
const CYBER_IMAGE_URL = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgRFqAvUV6j9-n3L65cySSsdK3JHZ88fKJlquXCK5pGhNRRlOmYfnIb3Zk4Y7SUC232-P5VcYgFZgiJ7jPfTR4HUmKtiOLG60FzYgby4m52MHOgXB0JuV5KZaR_3tdOPH5USQOqBx2GHYj_KTnntxjNzKKIh0VPFLAOaNoBlVJZi13KPvoWgjRRseVZObA/s1600/1000184023.jpg';

// Pesan Sambutan Cyberpunk Pro dengan Rincian Akses RDP
const cyberpunkWelcome = `
⚡ <b>[ SYSTEM INITIALIZED: CYBERNETIC_CORE ]</b> ⚡
━━━━━━━━━━━━━━━━━━━━━━━━━━
ACCESS GRANTED // PROTOCOL: TAILSCALE_RDP
━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 <b>RDP & AUTOMATION CONTROL INTERFACE</b>
Selamat datang di terminal utama sistem RDP Cyberpunk.

🖥️ <b>INFORMASI KONEKSI RDP:</b>
• <b>IP RDP :</b> <code>Cek via Tailscale Console / Logs</code>
• <b>User   :</b> <code>[Sesuai Input Workflow]</code>
• <b>Password:</b> <code>[Sesuai Input Workflow]</code>

⚙️ <b>SYSTEM STATUS:</b> <code>ONLINE [CYBERPUNK PRO]</code>
<i>Silakan pilih menu navigasi di bawah untuk mengelola RDP:</i>
`;

// 6 Tombol Menu Utama
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

// Handler saat pengguna mengirim pesan APAPUN
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

// Respon Tombol 1: ADMIN
bot.action('menu_admin', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('🛡️ <b>ADMIN CONTACT:</b>\nHubungi admin resmi untuk konsultasi & bantuan:\n🔗 https://t.me/Arianto2508\n📱 WA: 0831-2211-6267', { parse_mode: 'HTML' });
});

// Respon Tombol 2: RDP FREE
bot.action('menu_rdp_free', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(`⚡ <b>AKSES RDP FREE (TAILSCALE):</b>\n\n📌 <b>Panduan Koneksi:</b>\n1. Pastikan Tailscale terpasang di perangkat Anda.\n2. Jalankan workflow <b>Windows RDP Cyberpunk</b> di GitHub Actions.\n3. Masukkan <b>Passcode</b>, <b>User</b>, <b>Password</b>, dan <b>Tailscale Auth Key</b>.`, { parse_mode: 'HTML' });
});

// Respon Tombol 3: RDP BUY
bot.action('menu_rdp_buy', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('💎 <b>RDP BUY / PREMIUM:</b>\nBeli token & akses RDP durasi panjang tanpa antre melalui tautan resmi:', {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([[Markup.button.url('🛒 Checkout via Lynk.id', 'https://arianto12.lynk.id/p/ganjay')]])
  });
});

// Respon Tombol 4: PASSKODE
bot.action('menu_passkode', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('🔑 <b>VERIFIKASI PASSKODE:</b>\nDapatkan Passcode resmi untuk mengaktifkan workflow RDP di halaman web:\n🔗 https://arianto12.lynk.id/p/ganjay', { parse_mode: 'HTML' });
});

// Respon Tombol 5: INFO
bot.action('menu_info', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('ℹ️ <b>INFORMASI PEMILIK VPS:</b>\n======================\nMILIK ARIANTO\n======================\n@Arianto 2026 Lumajang Candipuro\nWhatsApp: 0831-2211-6267\n======================', { parse_mode: 'HTML' });
});

// Respon Tombol 6: BOT
bot.action('menu_bot', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('🤖 <b>BOT SPECIFICATION:</b>\n• Core: Node.js & Telegraf\n• Hosting: GitHub Actions / Cloud Runner\n• Integrated: Tailscale Mesh Network & Windows Server RDP', { parse_mode: 'HTML' });
});

// Jalankan Bot
bot.launch().then(() => {
  console.log('🤖 Cyberpunk Tailscale Bot berhasil berjalan!');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
