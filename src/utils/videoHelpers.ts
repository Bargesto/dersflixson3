interface VideoInfo {
  platform: 'youtube' | 'vimeo' | 'dailymotion' | 'embed';
  platform_url?: string;
}

export function extractVideoInfo(url: string): VideoInfo | null {
  try {
    let urlObj: URL;
    
    // Handle iframe src URLs
    if (url.includes('iframe') || url.includes('embed')) {
      return {
        platform: 'embed'
      };
    }

    // Try to create URL object
    try {
      urlObj = new URL(url);
    } catch {
      // If URL is invalid, try prepending https://
      urlObj = new URL(`https://${url}`);
    }
    
    // YouTube
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
      return { platform: 'youtube' };
    }
    
    // Vimeo
    if (urlObj.hostname.includes('vimeo.com')) {
      return { platform: 'vimeo' };
    }
    
    // Dailymotion
    if (urlObj.hostname.includes('dailymotion.com')) {
      return { platform: 'dailymotion' };
    }

    // Generic embed URLs
    if (url.includes('iframe') || url.includes('embed') || url.endsWith('.mp4')) {
      return {
        platform: 'embed'
      };
    }
  } catch (error) {
    // If all parsing fails, but URL ends with video extension or contains embed/iframe
    if (url.includes('iframe') || url.includes('embed') || url.endsWith('.mp4')) {
      return {
        platform: 'embed'
      };
    }
    return null;
  }
  
  return null;
}

export function getThumbnailUrl(platform: string, videoUrl: string): string {
  switch (platform) {
    case 'youtube':
      return 'https://placehold.co/640x360/333/fff?text=YouTube+Video';
    case 'vimeo':
      return 'https://placehold.co/640x360/333/fff?text=Vimeo+Video';
    case 'dailymotion':
      return 'https://placehold.co/640x360/333/fff?text=Dailymotion+Video';
    case 'embed':
      return 'https://placehold.co/640x360/333/fff?text=Video+Player';
    default:
      return 'https://placehold.co/640x360/333/fff?text=Video';
  }
}