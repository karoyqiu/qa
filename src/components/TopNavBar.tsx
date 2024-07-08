import {
  BookOpenIcon as BookOpenIconOutline,
  HomeIcon as HomeIconOutline,
  PencilIcon as PencilIconOutline,
} from '@heroicons/react/24/outline';
import {
  BookOpenIcon as BookOpenIconSolid,
  HomeIcon as HomeIconSolid,
  PencilIcon as PencilIconSolid,
} from '@heroicons/react/24/solid';
import TopNavLink from './TopNavLink';

type TopNavBarProps = {
  currentHref: string;
};

export default function TopNavBar(props: TopNavBarProps) {
  const { currentHref } = props;

  return (
    <ul className="menu navbar-center hidden rounded-box md:menu-horizontal">
      <TopNavLink
        href="/"
        text="Home"
        currentHref={currentHref}
        icon={<HomeIconOutline />}
        activeIcon={<HomeIconSolid />}
      />
      <TopNavLink
        href="/exam"
        text="Exam"
        currentHref={currentHref}
        icon={<PencilIconOutline />}
        activeIcon={<PencilIconSolid />}
      />
      <TopNavLink
        href="/book"
        text="Book"
        currentHref={currentHref}
        icon={<BookOpenIconOutline />}
        activeIcon={<BookOpenIconSolid />}
      />
    </ul>
  );
}
