<script lang="ts">
	const SITE_URL = 'https://nauticaresolutions.co.uk';

	let {
		path,
		title,
		description,
		image = '/images/hero/home.jpg'
	}: {
		path: string;
		title: string;
		description: string;
		image?: string;
	} = $props();

	const url = $derived(`${SITE_URL}${path}`);
	const imageUrl = $derived(`${SITE_URL}${image}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Nauticare Solutions" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={imageUrl} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>
