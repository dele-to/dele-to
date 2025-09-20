import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Globe } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-lg">DELE.TO</h3>
                        <p className="text-sm text-muted-foreground">
                            Secure credential sharing with zero-knowledge encryption.
                        </p>
                    </div>

                    {/* Product */}
                    <div className="space-y-3">
                        <h4 className="font-medium">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/create" className="hover:text-foreground transition-colors">
                                    Create Share
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-foreground transition-colors">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                {/* <Link href="/security" className="hover:text-foreground transition-colors">
                                    Security
                                </Link> */}
                            </li>
                        </ul>
                    </div>

                    {/* Comparisons */}
                    <div className="space-y-3">
                        <h4 className="font-medium">Alternatives</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/vs/yopass" className="hover:text-foreground transition-colors">
                                    vs Yopass
                                </Link>
                            </li>
                            <li>
                                <Link href="/vs/passwordpusher" className="hover:text-foreground transition-colors">
                                    vs PasswordPusher
                                </Link>
                            </li>
                            <li>
                                <Link href="/vs/privatebin" className="hover:text-foreground transition-colors">
                                    vs PrivateBin
                                </Link>
                            </li>
                            <li>
                                <Link href="/vs/onetimesecret" className="hover:text-foreground transition-colors">
                                    vs OneTimeSecret
                                </Link>
                            </li>
                            <li>
                                <Link href="/alternatives" className="hover:text-foreground transition-colors">
                                    All Alternatives
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal & Social */}
                    <div className="space-y-3">
                        <h4 className="font-medium">Links</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href="https://dele.to"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                                >
                                    <Globe className="h-3 w-3" />
                                    Website
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/dele-to/dele-to"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                                >
                                    <GitHubLogoIcon className="h-3 w-3" />
                                    GitHub Repo
                                </a>
                            </li>
                            {/* <li>
                                <Link href="/privacy" className="hover:text-foreground transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-foreground transition-colors">
                                    Terms of Service
                                </Link>
                            </li> */}
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} © Copyright DELE.TO. Built with ❤️ for secure sharing.</p>
                    <div className="mt-2">
                        <a
                            href="https://github.com/dele-to/dele-to"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-foreground hover:underline"
                        >
                            <GitHubLogoIcon className="h-4 w-4" />
                            <span className="font-medium">Open source on GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}