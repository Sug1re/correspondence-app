"use client";

type ConditionalProps = {
  when: boolean;
  children: React.ReactNode;
};

export function Conditional({ when, children }: ConditionalProps) {
  if (!when) return null;
  return <>{children}</>;
}
