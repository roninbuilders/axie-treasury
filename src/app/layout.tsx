import { Space_Grotesk } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import Navbar from '@/components/layout/navbar'
import { Metadata } from 'next'
import QueryContext from './QueryContext'

const fontSans = Space_Grotesk({
	subsets: ['latin'],
	variable: '--font-sans',
})

export const metadata: Metadata = {
	title: 'Axie Treasury Chart',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={cn('min-h-screen bg-background font-sans antialiased dark', fontSans.variable)}>
					<QueryContext>
					<Navbar />
					{children}
					</QueryContext>
			</body>
		</html>
	)
}
