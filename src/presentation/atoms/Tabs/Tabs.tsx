'use client';

import * as React from 'react';
import { cn } from '@/shared/utils/cn';
import { Tabs as UiTabs, TabsList as UiTabsList, TabsTrigger as UiTabsTrigger, TabsContent as UiTabsContent } from '@/components/ui/tabs';

export const Tabs = UiTabs;

export const TabsList: React.FC<React.ComponentProps<typeof UiTabsList>> = ({ className, ...props }) => (
  <UiTabsList className={cn('bg-white/70 backdrop-blur-sm rounded-full p-1', className)} {...props} />
);

export const TabsTrigger: React.FC<React.ComponentProps<typeof UiTabsTrigger>> = ({ className, ...props }) => (
  <UiTabsTrigger
    className={cn(
      'data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white rounded-full text-xs font-semibold uppercase tracking-wider',
      'px-4 py-2',
      className
    )}
    {...props}
  />
);

export const TabsContent = UiTabsContent;


