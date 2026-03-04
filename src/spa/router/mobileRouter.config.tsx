'use client';

<<<<<<< HEAD:src/app/[variants]/(mobile)/router/mobileRouter.config.tsx
=======
import { type RouteObject } from 'react-router-dom';

>>>>>>> origin/main:src/spa/router/mobileRouter.config.tsx
import {
  BusinessMobileRoutesWithMainLayout,
  BusinessMobileRoutesWithoutMainLayout,
} from '@/business/client/BusinessMobileRoutes';
<<<<<<< HEAD:src/app/[variants]/(mobile)/router/mobileRouter.config.tsx
import { type RouteConfig } from '@/utils/router';
=======
>>>>>>> origin/main:src/spa/router/mobileRouter.config.tsx
import { dynamicElement, dynamicLayout, ErrorBoundary, redirectElement } from '@/utils/router';

// Mobile router configuration (declarative mode)
export const mobileRoutes: RouteObject[] = [
  {
    children: [
      // Chat routes
      {
        children: [
          {
            element: redirectElement('/'),
            index: true,
          },
          {
            children: [
              {
                element: dynamicElement(() => import('@/routes/(mobile)/chat'), 'Mobile > Chat'),
                index: true,
              },
              {
                element: dynamicElement(
                  () => import('@/routes/(mobile)/chat/settings'),
                  'Mobile > Chat > Settings',
                ),
                path: 'settings',
              },
            ],
<<<<<<< HEAD:src/app/[variants]/(mobile)/router/mobileRouter.config.tsx
            element: dynamicLayout(() => import('../chat/_layout'), 'Mobile > Chat > Layout'),
=======
            element: dynamicLayout(
              () => import('@/routes/(mobile)/chat/_layout'),
              'Mobile > Chat > Layout',
            ),
>>>>>>> origin/main:src/spa/router/mobileRouter.config.tsx
            errorElement: <ErrorBoundary resetPath="/agent" />,
            path: ':aid',
          },
        ],
        path: 'agent',
      },

      // Discover routes with nested structure
      {
        children: [
          // List routes (with ListLayout)
          {
            children: [
              {
                element: dynamicElement(
                  () => import('@/routes/(main)/community/(list)/(home)'),
                  'Mobile > Discover > List > Home',
                ),
                index: true,
              },
              {
                children: [
                  {
                    element: dynamicElement(
                      () => import('@/routes/(main)/community/(list)/agent'),
                      'Mobile > Discover > List > Agent',
                    ),
                    path: 'agent',
                  },
                ],
              },
              {
                children: [
                  {
                    element: dynamicElement(
                      () => import('@/routes/(main)/community/(list)/model'),
                      'Mobile > Discover > List > Model',
                    ),
                    path: 'model',
                  },
                ],
              },
              {
                element: dynamicElement(
                  () => import('@/routes/(main)/community/(list)/provider'),
                  'Mobile > Discover > List > Provider',
                ),
                path: 'provider',
              },
              {
                children: [
                  {
                    element: dynamicElement(
                      () => import('@/routes/(main)/community/(list)/mcp'),
                      'Mobile > Discover > List > MCP',
                    ),
                    path: 'mcp',
                  },
                ],
              },
            ],
            element: dynamicElement(
              () => import('@/routes/(mobile)/community/(list)/_layout'),
              'Mobile > Discover > List > Layout',
            ),
          },
          // Detail routes (with DetailLayout)
          {
            children: [
              {
                element: dynamicElement(
                  () =>
                    import('@/routes/(main)/community/(detail)/agent').then(
                      (m) => m.MobileDiscoverAssistantDetailPage,
                    ),
                  'Mobile > Discover > Detail > Agent',
                ),
                path: 'agent/:slug',
              },
              {
                element: dynamicElement(
                  () =>
                    import('@/routes/(main)/community/(detail)/model').then(
                      (m) => m.MobileModelPage,
                    ),
                  'Mobile > Discover > Detail > Model',
                ),
                path: 'model/:slug',
              },
              {
                element: dynamicElement(
                  () =>
                    import('@/routes/(main)/community/(detail)/provider').then(
                      (m) => m.MobileProviderPage,
                    ),
                  'Mobile > Discover > Detail > Provider',
                ),
                path: 'provider/:slug',
              },
              {
                element: dynamicElement(
                  () =>
                    import('@/routes/(main)/community/(detail)/mcp').then((m) => m.MobileMcpPage),
                  'Mobile > Discover > Detail > MCP',
                ),
                path: 'mcp/:slug',
              },
              {
                element: dynamicElement(
                  () =>
                    import('@/routes/(main)/community/(detail)/user').then(
                      (m) => m.MobileUserDetailPage,
                    ),
                  'Mobile > Discover > Detail > User',
                ),
                path: 'user/:slug',
              },
            ],
            element: dynamicElement(
              () => import('@/routes/(mobile)/community/(detail)/_layout'),
              'Mobile > Discover > Detail > Layout',
            ),
          },
        ],
        element: dynamicElement(
          () => import('@/routes/(mobile)/community/_layout'),
          'Mobile > Discover > Layout',
        ),
        errorElement: <ErrorBoundary resetPath="/community" />,
        path: 'community',
      },

      // Settings routes
      {
        children: [
          {
            element: dynamicElement(
              () => import('@/routes/(mobile)/settings'),
              'Mobile > Settings',
            ),
            index: true,
          },
          // Provider routes with nested structure
          {
            children: [
              {
                element: redirectElement('/settings/provider/all'),
                index: true,
              },
              {
                element: dynamicElement(
                  () =>
                    import('@/routes/(main)/settings/provider').then((m) => m.ProviderDetailPage),
                  'Mobile > Settings > Provider > Detail',
                ),
                path: ':providerId',
              },
            ],
            element: dynamicLayout(
<<<<<<< HEAD:src/app/[variants]/(mobile)/router/mobileRouter.config.tsx
              () => import('../settings/provider/_layout'),
=======
              () => import('@/routes/(mobile)/settings/provider/_layout'),
>>>>>>> origin/main:src/spa/router/mobileRouter.config.tsx
              'Mobile > Settings > Provider > Layout',
            ),
            path: 'provider',
          },
          // Other settings tabs (common, agent, memory, tts, about, etc.)
          {
            element: dynamicElement(
              () => import('@/routes/(main)/settings'),
              'Mobile > Settings > Tab',
            ),
            path: ':tab',
          },
        ],
<<<<<<< HEAD:src/app/[variants]/(mobile)/router/mobileRouter.config.tsx
        element: dynamicLayout(() => import('../settings/_layout'), 'Mobile > Settings > Layout'),
=======
        element: dynamicLayout(
          () => import('@/routes/(mobile)/settings/_layout'),
          'Mobile > Settings > Layout',
        ),
>>>>>>> origin/main:src/spa/router/mobileRouter.config.tsx
        errorElement: <ErrorBoundary resetPath="/settings" />,
        path: 'settings',
      },

      ...BusinessMobileRoutesWithMainLayout,

      // Me routes (mobile personal center)
      {
        children: [
          {
            children: [
              {
                element: dynamicElement(
                  () => import('@/routes/(mobile)/me/(home)'),
                  'Mobile > Me > Home',
                ),
                index: true,
              },
            ],
            element: dynamicLayout(
<<<<<<< HEAD:src/app/[variants]/(mobile)/router/mobileRouter.config.tsx
              () => import('../me/(home)/layout'),
=======
              () => import('@/routes/(mobile)/me/(home)/layout'),
>>>>>>> origin/main:src/spa/router/mobileRouter.config.tsx
              'Mobile > Me > Home > Layout',
            ),
          },
          {
            children: [
              {
                element: dynamicElement(
                  () => import('@/routes/(mobile)/me/profile'),
                  'Mobile > Me > Profile',
                ),
                path: 'profile',
              },
            ],
            element: dynamicLayout(
<<<<<<< HEAD:src/app/[variants]/(mobile)/router/mobileRouter.config.tsx
              () => import('../me/profile/layout'),
=======
              () => import('@/routes/(mobile)/me/profile/layout'),
>>>>>>> origin/main:src/spa/router/mobileRouter.config.tsx
              'Mobile > Me > Profile > Layout',
            ),
          },
          {
            children: [
              {
                element: dynamicElement(
                  () => import('@/routes/(mobile)/me/settings'),
                  'Mobile > Me > Settings',
                ),
                path: 'settings',
              },
            ],
            element: dynamicLayout(
<<<<<<< HEAD:src/app/[variants]/(mobile)/router/mobileRouter.config.tsx
              () => import('../me/settings/layout'),
=======
              () => import('@/routes/(mobile)/me/settings/layout'),
>>>>>>> origin/main:src/spa/router/mobileRouter.config.tsx
              'Mobile > Me > Settings > Layout',
            ),
          },
        ],
        errorElement: <ErrorBoundary resetPath="/me" />,
        path: 'me',
      },

      // Default route - home page
      {
        children: [
          {
<<<<<<< HEAD:src/app/[variants]/(mobile)/router/mobileRouter.config.tsx
            element: dynamicElement(() => import('../(home)/'), 'Mobile > Home'),
            index: true,
          },
        ],
        element: dynamicLayout(() => import('../(home)/_layout'), 'Mobile > Home > Layout'),
=======
            element: dynamicElement(() => import('@/routes/(mobile)/(home)/'), 'Mobile > Home'),
            index: true,
          },
        ],
        element: dynamicLayout(
          () => import('@/routes/(mobile)/(home)/_layout'),
          'Mobile > Home > Layout',
        ),
>>>>>>> origin/main:src/spa/router/mobileRouter.config.tsx
      },

      // Catch-all route
      {
        element: redirectElement('/'),
        path: '*',
      },
    ],
<<<<<<< HEAD:src/app/[variants]/(mobile)/router/mobileRouter.config.tsx
    element: dynamicLayout(() => import('../_layout'), 'Mobile > Main > Layout'),
=======
    element: dynamicLayout(() => import('@/routes/(mobile)/_layout'), 'Mobile > Main > Layout'),
>>>>>>> origin/main:src/spa/router/mobileRouter.config.tsx
    errorElement: <ErrorBoundary resetPath="/" />,
    path: '/',
  },
  // Onboarding route (outside main layout)
  {
    element: dynamicElement(() => import('@/routes/onboarding'), 'Mobile > Onboarding'),
    errorElement: <ErrorBoundary resetPath="/" />,
    path: '/onboarding',
  },
  ...BusinessMobileRoutesWithoutMainLayout,

  // Share topic route (outside main layout)
  {
    children: [
      {
        element: dynamicElement(() => import('@/routes/share/t/[id]'), 'Mobile > Share > Topic'),
        path: ':id',
      },
    ],
    element: dynamicElement(
      () => import('@/routes/share/t/[id]/_layout'),
      'Mobile > Share > Topic > Layout',
    ),
    path: '/share/t',
  },
];
