"use client"

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black" id="contact">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Company Info */}
          <div className="space-y-6">
            <div className="text-xs uppercase tracking-wider text-white/50 font-medium">Customer Service Center</div>

            <div className="space-y-2">
              <p className="text-sm text-white/90 leading-relaxed">Titanbases Technology Co., Ltd.</p>
              <p className="text-sm text-white/70 leading-relaxed">Công ty TNHH Công Nghệ Titanbases</p>
              <p className="text-sm text-white/70 leading-relaxed">
                CEO: <span className="text-white/90">Nguyen Tuan Long</span>
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                Address:{" "}
                <a
                  href="https://maps.google.com/?q=112+Me+Tri,+Nam+Tu+Liem,+Hanoi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  112 Me Tri, Nam Tu Liem, Hanoi
                </a>
              </p>
            </div>

            <div className="pt-6 text-xs text-white/50 uppercase tracking-wider">
              Copyright 2025 Titanbases Technology Co., Ltd. All Rights Reserved
            </div>
          </div>

          {/* Right Column - Family Site & Logo */}
          <div className="flex flex-col items-start lg:items-end gap-6">
            <img
              src="/images/titanbases-logo.png"
              alt="Titanbases Technology Co., Ltd."
              className="h-24 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Bottom Gradient Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-accent via-primary to-secondary" />
    </footer>
  )
}
