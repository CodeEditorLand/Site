import { g as getImage$1 } from './Base_BgDg_fIU.mjs';

const imageConfig = {"endpoint":{"route":"/_image"},"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"dangerouslyProcessSVG":false,"domains":[],"remotePatterns":[],"responsiveStyles":false};
								Object.defineProperty(imageConfig, 'assetQueryParams', {
									value: undefined,
									enumerable: false,
									configurable: true,
								});
								const getImage = async (options) => await getImage$1(options, imageConfig);

export { getImage, imageConfig };
