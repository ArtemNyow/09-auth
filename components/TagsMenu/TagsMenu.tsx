'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import css from './TagsMenu.module.css';
import { fetchTags } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function TagsMenu() {
  const pathname = usePathname();
  const currentTag = pathname?.split('/')[3] || 'All';
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTags = async () => {
      try {
        setLoading(true);
        const data = await fetchTags();
        setTags(data);
      } catch (err) {
        console.error('Failed to load tags', err);
      } finally {
        setLoading(false);
      }
    };

    loadTags();
  }, []);

  if (!isAuthenticated) return null; 
  if (loading) return <div>Loading tags...</div>;

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={() => setOpen((prev) => !prev)}>
        {currentTag || 'Notes'} ▾
      </button>
      {open && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li
              key={tag}
              className={`${css.menuItem} ${tag === currentTag ? css.menuItemActive : ''}`}
            >
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={() => setOpen(false)}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
