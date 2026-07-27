import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
	if (transporter) return transporter;
	if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) return null;

	transporter = nodemailer.createTransport({
		host: env.SMTP_HOST,
		port: Number(env.SMTP_PORT ?? 465),
		secure: Number(env.SMTP_PORT ?? 465) === 465,
		auth: { user: env.SMTP_USER, pass: env.SMTP_PASS }
	});
	return transporter;
}

export async function sendContactNotification(entry: {
	name: string;
	email: string;
	message: string;
}) {
	const t = getTransporter();
	if (!t) {
		console.warn('SMTP not configured — skipping contact notification email.');
		return;
	}

	const to = env.CONTACT_TO_EMAIL || 'info@nauticaresolutions.co.uk';

	await t.sendMail({
		from: `"Nauticare Solutions Website" <${env.SMTP_USER}>`,
		to,
		replyTo: `"${entry.name}" <${entry.email}>`,
		subject: `New enquiry from ${entry.name}`,
		text: `Name: ${entry.name}\nEmail: ${entry.email}\n\n${entry.message}`,
		html: `
			<p><strong>Name:</strong> ${escapeHtml(entry.name)}</p>
			<p><strong>Email:</strong> ${escapeHtml(entry.email)}</p>
			<p><strong>Message:</strong></p>
			<p>${escapeHtml(entry.message).replace(/\n/g, '<br>')}</p>
		`
	});
}

function escapeHtml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}
