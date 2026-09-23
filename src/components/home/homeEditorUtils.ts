import { useMemo } from 'react';
import { useApp, HomePageSectionConfig } from '../../context/AppContext';

/**
 * Small bridge between the visual homepage editor and the existing homepage
 * components. Components keep their existing defaults, while values edited in
 * Admin → Home Page Editor override those defaults at render time.
 */
export function useHomeCopy(
  sectionId: string,
  defaultHeading: string,
  defaultSubheading: string
) {
  const { homePageConfig, cmsPages } = useApp();

  return useMemo(() => {
    const section: HomePageSectionConfig | undefined = homePageConfig?.sections?.find(
      item => item.id === sectionId
    );

    const cmsSection = cmsPages?.home?.sections?.[sectionId] as any;

    return {
      heading: section?.headingOverride || cmsSection?.heading || defaultHeading,
      subheading:
        section?.subheadingOverride ||
        cmsSection?.subheading ||
        cmsSection?.description ||
        defaultSubheading,
      imageUrl: section?.imageUrl || cmsSection?.imageUrl || '',
      layout: section?.layout || 'auto',
      autoScroll: Boolean(section?.autoScroll),
      autoScrollSpeed: section?.autoScrollSpeed || 1,
    };
  }, [homePageConfig, cmsPages, sectionId, defaultHeading, defaultSubheading]);
}
