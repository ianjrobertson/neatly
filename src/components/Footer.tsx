import { ModeToggle } from "./theme-switcher";

export default function Footer() {
    return (
        <footer className="border-t border-border py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <span className="font-medium text-foreground">Neatly</span>
                        <ModeToggle/>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                        <a href="#" className="hover:text-foreground transition-colors">Support</a>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    © 2025 Neatly. All rights reserved.
                </div>
            </div>
        </footer>
    )
}