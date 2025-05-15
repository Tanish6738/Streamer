const tools = [
	{
		icon: (
			<svg
				width='36'
				height='36'
				fill='none'
				viewBox='0 0 36 36'
			>
				<rect
					x='7'
					y='11'
					width='22'
					height='14'
					rx='4'
					fill='#ff512f'
				/>
				<rect
					x='14'
					y='18'
					width='8'
					height='2.5'
					rx='1.25'
					fill='#fff'
				/>
			</svg>
		),
		title: 'Content Uploader',
		desc: 'Easily upload and manage your videos, thumbnails, and metadata with our intuitive uploader.',
	},
	{
		icon: (
			<svg
				width='36'
				height='36'
				fill='none'
				viewBox='0 0 36 36'
			>
				<circle cx='18' cy='18' r='14' fill='#ff512f' />
				<path
					d='M14 18l4 4 4-4'
					stroke='#fff'
					strokeWidth='2.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		),
		title: 'Analytics Dashboard',
		desc: 'Track your content performance, audience engagement, and growth with real-time analytics.',
	},
	{
		icon: (
			<svg
				width='36'
				height='36'
				fill='none'
				viewBox='0 0 36 36'
			>
				<rect
					x='5'
					y='9'
					width='26'
					height='18'
					rx='5'
					fill='#ff512f'
				/>
				<rect
					x='12'
					y='17'
					width='12'
					height='4'
					rx='2'
					fill='#fff'
				/>
			</svg>
		),
		title: 'Live Streaming Studio',
		desc: 'Go live with ease using our built-in studio tools for overlays, chat, and stream management.',
	},
	{
		icon: (
			<svg
				width='36'
				height='36'
				fill='none'
				viewBox='0 0 36 36'
			>
				<circle cx='18' cy='18' r='16' fill='#ff512f' />
				<path
					d='M12 18l5 5 7-7'
					stroke='#fff'
					strokeWidth='2.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		),
		title: 'Community Tools',
		desc: 'Engage your audience with polls, Q&A, and community posts—all in one place.',
	},
];

const Tools = () => {
	return (
		<section className='w-full bg-gradient-to-b from-[#181A20] to-[#232526] py-24 px-4 border-t border-[#23272F] flex items-center justify-center'>
			<div className='max-w-6xl w-full flex flex-col items-center'>
				<h2 className='text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight text-center'>
					Creator Tools
				</h2>
				<p className='text-lg text-[#C7C9D3] mb-14 text-center max-w-2xl'>
					Powerful tools to help you create, manage, and grow your streaming
					channel with ease.
				</p>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full'>
					{tools.map((tool, idx) => (
						<div
							key={idx}
							className='flex flex-col items-center bg-gradient-to-br from-[#23272F] to-[#232526] rounded-3xl p-8 shadow-xl border border-[#23272F] hover:shadow-2xl hover:border-[#ff512f] transition-all duration-300 group relative overflow-hidden'
						>
							<div className='mb-5 group-hover:scale-110 transition-transform duration-300 drop-shadow-xl'>
								{tool.icon}
							</div>
							<h3 className='text-lg md:text-xl font-bold text-white mb-2 text-center group-hover:text-[#ff512f] transition-colors duration-300'>
								{tool.title}
							</h3>
							<p className='text-[#C7C9D3] text-center text-base leading-relaxed'>
								{tool.desc}
							</p>
							<div className='absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-[#ff512f] to-[#dd2476] transition-opacity duration-300 rounded-3xl pointer-events-none' />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Tools;