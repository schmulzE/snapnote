import ThemeSwitcher from '../components/shared/themeSwitcher';
import SharedLinkContainer from '../components/sharedLinks/sharedLinkContainer';
import { connectMongoDB } from '@/lib/mongodb';
import SharedLinkModel, { SharedLink } from '@/models/sharedLink';
import DeleteNote from '../components/notes/deleteNote';
import ToggleSidebarButton from '../components/shared/toggleSidebarButton';

export default async function App() {
  await connectMongoDB();
  const sharedLinks = (await SharedLinkModel.find()) as SharedLink[];

  return (
    <>
      <div className="flex items-center my-4">
        <ToggleSidebarButton/>
        <h1 className='text-xl md:text-3xl font-medium'>Settings</h1>
      </div>
      <div className="bg-content1 w-full max-5xl rounded-md p-4 space-y-4 text-sm">
        <ThemeSwitcher/>
        <SharedLinkContainer sharedLinks={JSON.parse(JSON.stringify(sharedLinks))}/>
        <DeleteNote/>
      </div>
    </>
  )
}