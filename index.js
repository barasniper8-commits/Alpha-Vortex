    - name: Kirim Informasi RDP ke Telegram Bot
      env:
        BOT_TOKEN: ${{ secrets.BOT_TOKEN }}
        CHAT_ID: "1908469040"
        RDP_USER: ${{ github.event.inputs.input_user }}
        RDP_PASS: ${{ github.event.inputs.input_password }}
      shell: pwsh
      run: |
        $tailscalePath = "${env:ProgramFiles}\Tailscale\tailscale.exe"
        
        # Beri jeda 10 detik agar IP Tailscale benar-benar terhubung dan terbaca
        Start-Sleep -Seconds 10
        $tsIp = (&$tailscalePath ip -4).Trim()
        
        if (-not $tsIp) {$tsIp = "Gagal Mendapatkan IP (Cek Tailscale Console)"
        }
        
        $msg = "⚡ *[ RDP CYBERPUNK READY ]* ⚡`n`n🖥️ *IP RDP:* $tsIp`n👤 *User:* $env:RDP_USER`n🔑 *Password:* $env:RDP_PASS`n`n_Silakan gunakan aplikasi Remote Desktop (RDP) via Tailscale untuk terhubung!_"
        
        $encodedMsg = [uri]::EscapeDataString($msg)
        $uri = "https://api.telegram.org/bot$env:BOT_TOKEN/sendMessage?chat_id=$env:CHAT_ID&text=$encodedMsg&parse_mode=Markdown"
        
        try {
            Invoke-RestMethod -Uri $uri -Method Get
            Write-Host "Status: Informasi RDP berhasil dikirim ke Telegram Anda!"
        } catch {
            Write-Host "Peringatan: Gagal mengirim pesan ke Telegram: $_"
        }
