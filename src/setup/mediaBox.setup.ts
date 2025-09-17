export interface MediaBoxSetup {
  accept: {
    mime: string[];            // e.g. ['image/*', 'video/*'] or specific like ['image/png']
    extensions: string[];      // e.g. ['png','jpg','mp4']
  };
  limits: {
    maxBytes: number;          // e.g. 10 * 1024 * 1024
  };
  transforms: {
    minScale: number;          // e.g. 0.2
    maxScale: number;          // e.g. 5
  };
  props?: Record<string, unknown>; // place for per-project extra props
  emits?: string[];                 // list of additional emits supported
}

export const defaultMediaBoxSetup: MediaBoxSetup = {
  accept: {
    mime: ['image/*', 'video/*'],
    extensions: ['jpg','jpeg','png','webp','gif','bmp','svg','mp4','webm','ogg']
  },
  limits: {
    maxBytes: 10 * 1024 * 1024
  },
  transforms: {
    minScale: 0.2,
    maxScale: 5
  }
};


