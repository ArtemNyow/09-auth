'use client'
import Link from 'next/link'
import css from './AuthNavigation.module.css'
import { useAuthStore } from '@/lib/store/authStore'
import { logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

export default function AuthNavigation() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter()

  const heandleLogout = async () => {
    await logout();
    clearAuth()
    router.push("/sign-in")
  }
  
    return <>
    {isAuthenticated ? (
  <>
    <li className={css.navigationItem}>
      <Link href="/profile" prefetch={false} className={css.navigationLink}>
        Profile
      </Link>
    </li>
    <li className={css.navigationItem}>
      <div className={css.userContainer}>
        <p className={css.userEmail}>{user?.email}</p>
        <button className={css.logoutButton} onClick={heandleLogout}>
          Logout
        </button>
      </div>
    </li>
  </>
) : (
  <>
    <li className={css.navigationItem}>
      <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
        Login
      </Link>
    </li>
    <li className={css.navigationItem}>
      <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
        Sign up
      </Link>
    </li>
  </>
)}     
</>


}