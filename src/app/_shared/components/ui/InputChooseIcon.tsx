import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import Icon from "../../utils/Icon";
import Link from "next/link";

const dataIcon =
  "ArrowDown,ArrowDownCircle,ArrowDownLeft,ArrowDownRight,ArrowLeft,ArrowLeftCircle,ArrowRight,ArrowRightCircle,ArrowUp,ArrowUpCircle,ArrowUpLeft,ArrowUpRight,Check,CheckCircle,ChevronDown,ChevronLeft,ChevronRight,ChevronUp,Circle,Copy,Download,Edit,Eye,EyeOff,File,FileText,Filter,Heart,Home,Image,Info,Link,Lock,Mail,Menu,MessageCircle,MessageSquare,Moon,MoreHorizontal,MoreVertical,Package,Paperclip,Plus,PlusCircle,Search,Settings,Share,Star,Sun,Trash,Upload,User,X,XCircle,Activity,Airplay,AlertCircle,AlertOctagon,AlertTriangle,AlignCenter,AlignJustify,AlignLeft,AlignRight,Anchor,Archive,AtSign,Award,Battery,BellOff,Bell,Bluetooth,Bold,BookOpen,Book,Bookmark,Box,Briefcase,Calendar,CameraOff,Camera,Cast,Chrome,Clipboard,Clock,Cloud,Code,Codepen,Coffee,Command,Compass,Delete,Disc,DollarSign,Droplet,Facebook,FastForward,Feather,Flag,Folder,Gift,GitBranch,Gitlab,Globe,Grid,Hash,Headphones,Inbox,Instagram,Layers,Layout,LifeBuoy,Link2,Linkedin,List,Loader,Map,MapPin,Maximize,Minimize,Monitor,Music,Octagon,Package,Pause,Percent,PhoneCall,Phone,Play,Power,Printer,Radio,Repeat,Rewind,Save,Scissors,Send,Server,Shield,Shuffle,Sidebar,Slack,Slash,Sliders,Smartphone,Speaker,Square,StopCircle,Tag,Terminal,ThumbsDown,ThumbsUp,Triangle,Truck,Tv,Twitter,Type,Umbrella,Underline,Video,VolumeX,Volume,Watch,Wifi,Youtube,ZapOff,Zap,ZoomIn,ZoomOut,Aperture,BarChart,BarChart2,BatteryCharging,Cpu,CreditCard,Database,Film,Framer,HardDrive,Key,Mic,MicOff,Mouse,Move,Navigation,Navigation2,Pen,PenTool,Pocket,Printer,Save,Settings,Share2,ShieldOff,ShoppingBag,ShoppingCart,Tablet,Target,Thermometer,Trash2,TrendingDown,TrendingUp,Unlock,UserCheck,UserMinus,UserPlus,UserX,Users,Voicemail,Volume1,Volume2,Wind,WifiOff,XSquare,Banknote,Beef,Beer,BellPlus,BellRing,Bike,Binary,Bird,Bitcoin,Blocks,BluetoothConnected,BluetoothOff,BluetoothSearching,Bomb,Bone,BoxSelect,Boxes,Braces,Brain,Brush,Bug,Building,Building2,Bus,Cake,Calculator,CalendarCheck,CalendarCheck2,CalendarClock,CalendarDays,CalendarHeart,CalendarMinus,CalendarOff,CalendarPlus,CalendarRange,CalendarSearch,CalendarX,CalendarX2,Candy,Car,Carrot,Cat,ChartBar,ChartLine,ChartPie,ChevronDownCircle,ChevronDownSquare,ChevronFirst,ChevronLast,ChevronLeftCircle,ChevronLeftSquare,ChevronRightCircle,ChevronRightSquare,ChevronUpCircle,ChevronUpSquare,ChevronsDown,ChevronsDownUp,ChevronsLeft,ChevronsLeftRight,ChevronsRight,ChevronsRightLeft,ChevronsUp,ChevronsUpDown,Church,Cigarette,CircleDashed,CircleDollarSign,CircleDot,CircleEllipsis,CircleEqual,CircleOff,CircleSlash,CircleSlash2,CircleUser,CircuitBoard,Citrus,Clapperboard,ClipboardCheck,ClipboardCopy,ClipboardEdit,ClipboardList,ClipboardPaste,ClipboardSignature,ClipboardType,ClipboardX,Clock1,Clock10,Clock11,Clock12,Clock2,Clock3,Clock4,Clock5,Clock6,Clock7,Clock8,Clock9,CloudCog,CloudDrizzle,CloudFog,CloudHail,CloudLightning,CloudMoon,CloudMoonRain,CloudOff,CloudRain,CloudRainWind,CloudSnow,CloudSun,CloudSunRain,Cloudy,Clover,Code2,Codesandbox,Cog,Coins,Columns,Component,ConciergeBell,Construction,Contact,Contact2,Container,Contrast,Cookie,Copy2,CopyCheck,CopyMinus,CopyPlus,CopySlash,CopyX,Copyleft,Copyright,CornerDownLeft,CornerDownRight,CornerLeftDown,CornerLeftUp,CornerRightDown,CornerRightUp,CornerUpLeft,CornerUpRight,Cpu2,CreativeCommons,CreditCard2,Croissant,Crop,Cross,Crosshair,Crown,CupSoda,Currency,Diamond,Dice1,Dice2,Dice3,Dice4,Dice5,Dice6,Dices,Diff,Disc2,Divide,DivideCircle,DivideSquare,DNA,Dog,DollarSign2,Donut,DoorClosed,DoorOpen,Dot,Download2,DraftingCompass,Drawer,Dribbble,Droplets,Drumstick,Dumbbell,Ear,EarOff,Edit2,Edit3,Egg,EggFried,EggOff,Equal,EqualNot,Euro,Expand,ExternalLink,Eye2,EyeOff2,Facebook2,Factory,Fan,FastForward2,Feather2,FerrisWheel,Figma,File2,FileArchive,FileAudio,FileAudio2,FileAxis3D,FileBarChart,FileBarChart2,FileBox,FileCheck,FileCheck2,FileClock,FileCode,FileCog,FileDiff,FileDigit,FileDown,FileEdit,FileHeart,FileImage,FileInput,FileJson,FileJson2,FileKey,FileKey2,FileLineChart,FileLock,FileLock2,FileMinus,FileMinus2,FileMusic,FileOutput,FilePieChart,FilePlus,FilePlus2,FileQuestion,FileSearch,FileSignature,FileSpreadsheet,FileStack,FileSymlink,FileTerminal,FileText2,FileType,FileType2,FileUp,FileVideo,FileVideo2,FileVolume,FileVolume2,FileWarning,FileX,FileX2,Files,Fingerprint,Fish,Flag2,Flag3,FlagOff,FlagTriangle,FlagTriangleLeft,FlagTriangleRight,Flame,Flashlight,FlashlightOff,FlaskConical,FlaskRound,FlipHorizontal,FlipHorizontal2,FlipVertical,FlipVertical2,Flower,Flower2,Focus,FoldHorizontal,FoldVertical,Folder2,FolderArchive,FolderCheck,FolderClock,FolderClosed,FolderCog,FolderDot,FolderDown,FolderEdit,FolderGit,FolderGit2,FolderHeart,FolderInput,FolderKey,FolderLock,FolderMinus,FolderOpen,FolderOutput,FolderPlus,FolderSearch,FolderSearch2,FolderSymlink,FolderSync,FolderTree,FolderUp,FolderX,Folders,Footprints,Forklift,FormInput,Forward,Frame,Framer2,Frown,Fuel,FunctionSquare,Gamepad,Gamepad2,Gauge,Gavel,Gem,Ghost,Gift2,GitBranch2,GitBranchPlus,GitCommit,GitCompare,GitFork,GitMerge,GitPullRequest,GitPullRequestClosed,GitPullRequestDraft,Glass,GlassWater,Glasses,Globe2,Goal,Grab,GraduationCap,Grape,Grid2,Grid3,Grip,GripHorizontal,GripVertical,Group,Hammer,Hand,HandMetal,HardDrive2,HardHat,Hash2,Haze,Heading,Heading1,Heading2,Heading3,Heading4,Heading5,Heading6,Headphones2,HeadphonesCharge,HeadphonesOff,Heart2,HeartCrack,HeartHandshake,HeartOff,HeartPulse,HelpCircle,HelpingHand,Hexagon,Highlighter,History,Hop,Hourglass,IceCream,IceCream2,Image2,ImageMinus,ImageOff,ImagePlus,Import,Inbox2,Indent,IndianRupee,Infinity,Info2,Inspect,Instagram2,Italic,JapaneseYen,Joystick,Key2,Keyboard,KeyboardMusic,Lamp,LampCeiling,LampDesk,LampFloor,LampWallDown,LampWallUp,Landmark,Languages,Laptop,Laptop2,Lasso,LassoSelect,Laugh,Layers2,Layers3,Layout2,LayoutDashboard,LayoutGrid,LayoutList,LayoutPanelLeft,LayoutPanelTop,LayoutTemplate,Leaf,LeafyGreen,Library,LifeBuoy2,Lightbulb,LightbulbOff,LineChart,Link2Off,List2,ListChecks,ListEnd,ListMinus,ListMusic,ListOrdered,ListPlus,ListStart,ListTodo,ListTree,ListVideo,ListX,Loader2,Locate,LocateFixed,LocateOff,Lock2,LockKeyhole,LogIn,LogOut,Lollipop,Luggage,MSquare,Magnet,Mail2,MailCheck,MailMinus,MailOpen,MailPlus,MailQuestion,MailSearch,MailWarning,MailX,Mailbox,Mails,MapPinOff,Martini,Maximize2,Medal,Megaphone,MegaphoneOff,Meh,MemoryStick,Menu2,MenuSquare,Merge,MessageCircle2,MessageSquare2,Messages,MessagesSquare,Mic2,MicOff2,Microscope,Microwave,Milestone,Milk,MilkOff,Minimize2,Minus2,MinusCircle2,MinusSquare,Monitor2,MonitorCheck,MonitorDot,MonitorDown,MonitorOff,MonitorPause,MonitorPlay,MonitorSmartphone,MonitorSpeaker,MonitorStop,MonitorUp,MonitorX,Moon2,MoonStar,MoreHorizontal2,MoreVertical2,Mountain,MountainSnow,Mouse2,MousePointer,MousePointer2,MousePointerClick,MousePointerSquare,Move2,Move3D,MoveDiagonal,MoveDiagonal2,MoveDown,MoveHorizontal,MoveLeft,MoveRight,MoveUp,MoveVertical,Music2,Music3,Music4,Navigation3,Network,Newspaper,Nfc,NutOff,Octagon2,Option,Orbit,Outdent,Package2,PackageCheck,PackageMinus,PackageOpen,PackagePlus,PackageSearch,PackageX,PaintBucket,Paintbrush,PaintBrush2,Palette,Palmtree,PanelBottom,PanelLeft,PanelLeftClose,PanelLeftOpen,PanelRight,PanelRightClose,PanelRightOpen,PanelTop,Paperclip2,Parentheses,ParkingCircle,ParkingCircleOff,ParkingSquare,ParkingSquareOff,PartyPopper,Pause2,PauseCircle,PauseOctagon,PawPrint,Pen2,Pencil,PenLine,PenSquare,Percent2,PersonStanding,Phone2,PhoneCall2,PhoneForwarded,PhoneIncoming,PhoneMissed,PhoneOff,PhoneOutgoing,Pi,PictureInPicture,PictureInPicture2,PieChart2,Piggy,Pilcrow,Pill,Pin,PinOff,Pipette,Pizza,Plane,PlaneLanding,PlaneTakeoff,Play2,PlayCircle,PlaySquare,Plug,Plug2,PlugZap,Plus2,PlusCircle2,PlusSquare,Pocket2,Podcast,Point,Power2,PowerOff,Printer2,Projector,Puzzle,QrCode,Quote,Radio2,RadioReceiver,RadioTower,Radius,RailSymbol,Rainbow,Rat,Receipt,Rectangle,RectangleHorizontal,RectangleVertical,Recycle,Redo,RedoDot,RefreshCw,,Regex,RemoveFormatting,Repeat2,Replace,ReplaceAll,Reply,ReplyAll,Rewind2,Ribbon,Rocket,RockingChair,Rotate3D,RotateCcw2,RotateCw2,Route,Router,Rows,Rss2,Ruler,RussianRuble,Sailboat,Salad,Sandwich,Satellite,SatelliteDish,Save2,Scale,Scale3D,Scaling,Scan,ScanFace,ScanLine,School,School2,Scissors2,ScreenShare,ScreenShareOff,Scroll,ScrollText,Search2,SearchCheck,SearchCode,SearchSlash,SearchX,Send2,SeparatorHorizontal,SeparatorVertical,Server2,ServerCog,ServerCrash,ServerOff,Settings2,Share3,Sheet,Shell,Shield2,ShieldAlert,ShieldBan,ShieldCheck,ShieldClose,ShieldHalf,ShieldMinus,ShieldOff2,ShieldPlus,ShieldQuestion,ShieldX,Ship,Shirt,ShoppingBag2,ShoppingCart2,Shovel,ShowerHead,Shrink,Shrub,Shuffle2,Sigma,Signal,SignalHigh,SignalLow,SignalMedium,SignalZero,Siren,SkipBack,SkipForward,Skull,Slack2,Slash2,Slice,Sliders2,Smartphone2,SmartphoneCharging,SmartphoneNfc,Smile,SmilePlus,Snail,Snowflake,Sofa,Sort,SortAsc,SortDesc,Soup,Space,Spade,Sparkle,Sparkles,Speaker2,Spline,Split,SprayCan,Sprout,Square2,SquareAsterisk,SquareCode,SquareDashedBottom,SquareDot,SquareEqual,SquareSlash,SquareStack,SquareUser,Squirrel,Stamp,Star2,StarHalf,StarOff,StepBack,StepForward,Stethoscope,Sticker,StickyNote,StopCircle2,Store,StretchHorizontal,StretchVertical,Strikethrough,Subscript,Subtitles,Sun2,SunDim,SunMedium,SunMoon,SunSnow,Sunrise,Sunset,Superscript,SwissFranc,SwitchCamera,Sword,Swords,Syringe,Table,Table2,Tablet2,Tablets,Tag2,Tags,Target2,Tent,Terminal2,TerminalSquare,TestTube,TestTube2,TestTubes,Text,TextCursor,TextCursorInput,TextQuote,TextSelect,Theater,Thermometer2,ThermometerSnowflake,ThermometerSun,ThumbsDown2,ThumbsUp2,Ticket,Timer,TimerOff,TimerReset,Toggle2Left,Toggle2Right,Toggle3Left,Toggle3Right,ToggleLeft,ToggleRight,Tornado,TouchpadOff,Tractor,TrafficCone,Train,TrainFront,TrainTrack,TramFront,Transform,Trash3,TreeDeciduous,TreePine,Trees,Trello,TrendingDown2,TrendingUp2,Triangle2,Trophy,Truck2,Turtle,Tv2,Type2,Umbrella2,Underline2,Undo,UndoDot,UnfoldHorizontal,UnfoldVertical,Ungroup,Unlink,Unlink2,Unplug,Usb,User2,UserCheck2,UserCircle,UserCircle2,UserCog,UserCog2,UserMinus2,UserPlus2,UserRoundCheck,UserRoundCog,UserRoundMinus,UserRoundPlus,UserRoundX,UserSquare,UserSquare2,UserX2,Users2,UsersRound,Utensils,UtensilsCrossed,UtilityPole,Variable,Vegan,VenetianMask,Vibrate,VideoOff,View,Vote,Wallet,Wallet2,Wallpaper,Wand,Wand2,Warehouse,Waves,Waypoints,Webcam,Webhook,Weight,Wheat,WheatOff,WholeWord,Wine,WineOff,Workflow,WrapText,Wrench,XOctagon";

export default function InputChooseIcon({
  dataValue,
  setDataValue,
}: {
  dataValue: string;
  setDataValue: (value: string) => void;
}) {
  const [openIcon, setOpenIcon] = useState(false);
  const converJson = dataIcon.split(",");
  const dataFind = converJson.filter((item) => {
    return item.includes(dataValue);
  });

  return (
    <div>
      <div>
        <Input
          label="Chọn thêm icon từ https://lucide.dev/icons "
          startContent={
            <Link
              href={`https://lucide.dev/icons/?search=${dataValue}`}
              target="_blank"
            >
              <Icon icon="Link" size={20} />
            </Link>
          }
          placeholder="Nhập Icon"
          className="w-full text-xl"
          value={dataValue || ""}
          onChange={(e) => {
            setDataValue(e.target.value);
            setOpenIcon(true);
          }}
          endContent={
            <div onClick={() => setOpenIcon(!openIcon)}>
              <Icon
                icon={openIcon ? "ChevronUp" : "ChevronDown"}
                size={24}
                className="cursor-pointer transition-all duration-300 hover:text-blue-500"
              />
            </div>
          }
        />
      </div>
      {openIcon && (
        <div className="mt-2 w-full bg-gray-50 shadow-md rounded-md p-2 max-h-96 overflow-y-auto transition-all duration-300">
          {dataFind.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer hover:bg-gray-100 p-2 rounded"
            >
              <div
                className="flex items-center gap-2"
                onClick={() => {
                  setDataValue(item);
                  setOpenIcon(false);
                }}
              >
                <Icon icon={item} size={24} />
                <span>{item}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
