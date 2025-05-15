const features = [
	{
		icon: (
			<svg
				width='32'
				height='32'
				fill='none'
				viewBox='0 0 32 32'
			>
				<rect
					x='4'
					y='8'
					width='24'
					height='16'
					rx='4'
					fill='#ff512f'
				/>
				<rect
					x='10'
					y='14'
					width='12'
					height='4'
					rx='2'
					fill='#fff'
				/>
			</svg>
		),
		title: 'HD & 4K Streaming',
		desc: 'Enjoy your favorite content in stunning high definition and 4K quality, with smooth playback on any device.',
	},
	{
		icon: (
			<svg
				width='32'
				height='32'
				fill='none'
				viewBox='0 0 32 32'
			>
				<circle cx='16' cy='16' r='12' fill='#ff512f' />
				<path
					d='M12 16l4 4 4-4'
					stroke='#fff'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		),
		title: 'Personalized Recommendations',
		desc: 'Discover new shows and movies tailored to your taste with our smart recommendation engine.',
	},
	{
		icon: (
			<svg
				width='32'
				height='32'
				fill='none'
				viewBox='0 0 32 32'
			>
				<rect
					x='6'
					y='10'
					width='20'
					height='12'
					rx='3'
					fill='#ff512f'
				/>
				<rect
					x='12'
					y='16'
					width='8'
					height='2'
					rx='1'
					fill='#fff'
				/>
			</svg>
		),
		title: 'Multi-Device Support',
		desc: 'Watch anywhere—on your TV, laptop, tablet, or phone. Seamless experience across all devices.',
	},
	{
		icon: (
			<svg
				width='32'
				height='32'
				fill='none'
				viewBox='0 0 32 32'
			>
				<circle cx='16' cy='16' r='14' fill='#ff512f' />
				<path
					d='M10 16l4 4 8-8'
					stroke='#fff'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		),
		title: 'No Ads, Ever',
		desc: 'Enjoy uninterrupted streaming with zero ads—just pure entertainment, all the time.',
	},
];

const Features = () => {
	return (
		<section className='w-full bg-gradient-to-b from-[#232526] to-[#181A20] py-20 px-4 border-t border-[#23272F] flex items-center justify-center'>
			<div className='max-w-6xl w-full flex flex-col items-center'>
				<h2 className='text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight'>
					Platform Features
				</h2>
				<p className='text-lg text-[#C7C9D3] mb-12 text-center max-w-2xl'>
					Everything you need for the ultimate streaming experience—powerful,
					fast, and always available.
				</p>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full'>
					{features.map((feature, idx) => (
						<div
							key={idx}
							className='flex flex-col items-center bg-[#23272F] rounded-2xl p-7 shadow-lg border border-[#23272F] hover:shadow-2xl hover:border-[#ff512f] transition-all duration-300 group'
						>
							<div className='mb-4 group-hover:scale-110 transition-transform duration-300'>
								{feature.icon}
							</div>
							<h3 className='text-xl font-bold text-white mb-2 text-center'>
								{feature.title}
							</h3>
							<p className='text-[#C7C9D3] text-center text-base'>
								{feature.desc}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;