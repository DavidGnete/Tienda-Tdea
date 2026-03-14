"use client"

import { Search, User, Menu, X } from "lucide-react"
import { Button } from "../ui/Button"
import { useState } from "react"

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-semibold text-foreground hidden sm:block">
              Tienda Tdea
            </span>
          </div>

          {/* Barra de búsqueda - Desktop */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar libros, apuntes, electrónica..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Botones - Desktop */}
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              className="hidden sm:flex items-center gap-2 rounded-full border-border hover:border-primary hover:text-primary transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Iniciar sesión</span>
            </Button>
            <Button className="hidden sm:flex items-center gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              Vender
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="pb-4 md:hidden border-t border-border pt-4 flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full justify-center rounded-full border-border"
            >
              <User className="w-4 h-4 mr-2" />
              Iniciar sesión
            </Button>
            <Button className="w-full justify-center rounded-full bg-primary text-primary-foreground">
              Vender
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
