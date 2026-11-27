import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Server,
  CheckCircle2,
  LayoutGrid,
  Orbit,
} from "lucide-react";
import { Github } from "@/components/icons";
import { projects } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import CircularCarousel, {
  type CircularCarouselHandle,
  type CircularCarouselItem,
} from "@/components/ui/CircularCarousel";
import type { Project } from "@/types/portfolio";
import tursoIcon from "@/assets/turso.png";
import renderIcon from "@/assets/render.png";

const TECH_ICONS: Record<string, { icon: React.ReactNode; color: string }> = {
  HTML5: {
    icon: (
      <svg className="size-4" viewBox="0 0 452 520" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.4 460.7L0 0h452l-41.5 460.6L226 520" fill="#E34F26" />
        <path d="M226 482.8l149.3-41.4 35.4-396.4H226" fill="#EF652A" />
        <path d="M226 212.5h-75.2l-5.2-58.2H226v-56.9H85.1l1.4 15.5 14.3 160.5H226zm0 147.3l-.3.1-63-17-4-44.8H101l7.9 88.3 117 32.5.3-.1z" fill="#fff" />
        <path d="M226 212.5v56.9h70l-6.6 73.7-63.4 17v59.1l117.3-32.5.9-9.7 13.4-150.1 1.4-14.4H226zm0-155.1v56.9h137.8l1.1-12.2 2.5-28.2 1.4-16.5z" fill="#EBEBEB" />
      </svg>
    ),
    color: "#E34F26",
  },
  CSS3: {
    icon: (
      <svg className="size-4" viewBox="0 0 452 520" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.4 460.7L0 0h452l-41.5 460.6L226 520" fill="#1572B6" />
        <path d="M226 482.8l149.3-41.4 35.4-396.4H226" fill="#33A9DC" />
        <path d="M226 212.5H116.5l3.7 41.4H226v-41.4zm0-99.1H107.1l3.7 41.3H226v-41.3zm0 228.6-.3.1-74.8-20.2-5.2-58.5H104l10.3 115.3 111.4 30.9.3-.1v-67.5z" fill="#fff" />
        <path d="M226 212.5v41.4h104.8l-9.8 109.7-95 25.7V448l111.3-30.8.8-9.2 15.3-171.4 1.6-17.1H226zm0-99.1v41.3h121.8l1-10.8 2.2-24 1.5-16.5H226z" fill="#EBEBEB" />
      </svg>
    ),
    color: "#1572B6",
  },
  JavaScript: {
    icon: (
      <svg className="size-4" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" fill="#F7DF1E" rx="12" />
        <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.889-3.092 12.889-15.12v-81.798h24.058v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.979-36.086-21.994m88.56-3.244l19.588-11.374c5.157 8.421 11.859 14.607 23.715 14.607 9.964 0 16.321-4.984 16.321-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.395-28.871-16.673-28.871-36.26 0-18.044 13.748-31.792 35.229-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.731 12.029c-4.125-7.394-8.591-10.315-15.465-10.315-7.046 0-11.514 4.468-11.514 10.315 0 7.217 4.468 10.143 14.778 14.608l6.013 2.581c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.814-24.542" fill="#000" />
      </svg>
    ),
    color: "#F7DF1E",
  },
  TypeScript: {
    icon: (
      <svg className="size-4" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" rx="20" fill="#3178C6" />
        <path d="M150.5 166.5c3.5 5.8 8.2 10 16.8 10 7.1 0 11.6-3.5 11.6-8.4 0-5.8-4.6-7.8-12.4-11.2l-4.3-1.8c-12.3-5.3-20.5-11.9-20.5-25.9 0-12.9 9.8-22.7 25.1-22.7 10.9 0 18.7 3.8 24.3 13.8l-13.3 8.5c-2.9-5.3-6.1-7.4-11-7.4-5 0-8.2 3.2-8.2 7.4 0 5.2 3.2 7.2 10.6 10.4l4.3 1.8c14.5 6.2 22.7 12.6 22.7 26.9 0 15.4-12.1 23.9-28.3 23.9-15.9 0-26.1-7.5-31.1-17.4l13.7-8.8zm-56.4-51.4h-24.9v-14.6h66.4v14.6h-24.8v65.4h-16.7v-65.4z" fill="white" />
      </svg>
    ),
    color: "#3178C6",
  },
  "React Native": {
    icon: (
      <svg className="size-4" viewBox="-11.5 -10.232 23 20.463" xmlns="http://www.w3.org/2000/svg">
        <circle r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
    color: "#61DAFB",
  },
  React: {
    icon: (
      <svg className="size-4" viewBox="-11.5 -10.232 23 20.463" xmlns="http://www.w3.org/2000/svg">
        <circle r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
    color: "#61DAFB",
  },
  "Node.js": {
    icon: (
      <svg className="size-4" viewBox="0 0 256 282" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ndg-proj" x1="68.188%" y1="17.487%" x2="27.823%" y2="89.755%">
            <stop stopColor="#41873F" offset="0%" />
            <stop stopColor="#418B3D" offset="32.88%" />
            <stop stopColor="#34A853" offset="63.52%" />
            <stop stopColor="#2EB156" offset="100%" />
          </linearGradient>
        </defs>
        <path d="M128 0L0 73.9v141.1L128 282l128-67v-141L128 0z" fill="url(#ndg-proj)" />
        <path d="M116 200v-80l-28 16v80l28-16z" fill="#fff" opacity="0.8" />
        <path d="M144 200v-80l28 16v80l-28-16z" fill="#fff" opacity="0.6" />
        <path d="M128 108l-28 16 28 16 28-16-28-16z" fill="#fff" />
      </svg>
    ),
    color: "#339933",
  },
  PostgreSQL: {
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#4169E1">
        <path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z" />
      </svg>
    ),
    color: "#4169E1",
  },
  Prisma: {
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#2D3748">
        <path d="M21.8068 18.2848L13.5528.7565c-.207-.4382-.639-.7273-1.1286-.7541-.5023-.0293-.9523.213-1.2062.6253L2.266 15.1271c-.2773.4518-.2718 1.0091.0158 1.4555l4.3759 6.7786c.2608.4046.7127.6388 1.1823.6388.1332 0 .267-.0188.3987-.0577l12.7019-3.7568c.3891-.1151.7072-.3904.8737-.7553s.1633-.7828-.0075-1.1454zm-1.8481.7519L9.1814 22.2242c-.3292.0975-.6448-.1873-.5756-.5194l3.8501-18.4386c.072-.3448.5486-.3996.699-.0803l7.1288 15.138c.1344.2856-.019.6224-.325.7128z" />
      </svg>
    ),
    color: "#2D3748",
  },
  MongoDB: {
    icon: (
      <svg className="size-4" viewBox="0 0 256 549" xmlns="http://www.w3.org/2000/svg">
        <path d="M175.622 61.108C152.612 33.807 132.797 6.078 128.749.32a1.03 1.03 0 00-1.492 0c-4.048 5.759-23.863 33.487-46.873 60.788-197.507 251.896 31.108 421.852 31.108 421.852l1.917 1.28c1.172 26.08 5.227 59.372 5.227 59.372h8.737s4.055-33.292 5.227-59.372l1.917-1.28s228.615-169.956 31.105-421.852" fill="#00ED64" />
        <path d="M128 .32s-19.984 28.538-46.873 60.788C-116.38 313.004 112.235 482.96 112.235 482.96l1.917 1.28c1.172 26.08 5.227 59.372 5.227 59.372h8.621V.32z" fill="#00A550" opacity="0.5" />
      </svg>
    ),
    color: "#47A248",
  },
  Python: {
    icon: (
      <svg className="size-4" viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="py-a" x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%">
            <stop stopColor="#387EB8" offset="0%" />
            <stop stopColor="#366994" offset="100%" />
          </linearGradient>
          <linearGradient id="py-b" x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%">
            <stop stopColor="#FFE052" offset="0%" />
            <stop stopColor="#FFC331" offset="100%" />
          </linearGradient>
        </defs>
        <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="url(#py-a)" />
        <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="url(#py-b)" />
      </svg>
    ),
    color: "#3776AB",
  },
  PHP: {
    icon: (
      <svg className="size-4" viewBox="0 0 256 134" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="128" cy="67" rx="128" ry="67" fill="#8993BE" />
        <path d="M35.945 106.082l14.028-71.014h28.167c12.159 0 21.165 2.419 26.974 7.242 5.855 4.857 8.758 12.163 8.758 21.884 0 11.41-3.392 20.812-10.15 28.107-6.759 7.316-15.551 11.818-26.336 13.485l-2.26.278H52.39l-5.054 25.606H35.945zm23.28-35.32H73.14c7.926 0 14.369-2.02 19.315-6.073 4.946-4.04 7.424-9.252 7.424-15.606 0-4.803-1.545-8.339-4.661-10.608-3.082-2.235-7.97-3.37-14.629-3.37H66.67l-7.444 35.658zM113.737 106.082l14.028-71.014h11.218l-3.387 17.147c4.358-6.076 9.263-10.766 14.715-14.051 5.452-3.285 10.663-4.929 15.634-4.929 4.005 0 7.333.828 9.984 2.449 2.641 1.621 4.514 3.962 5.627 7.023 1.103 3.061 1.659 6.978 1.659 11.752 0 1.785-.18 4.009-.557 6.673l-8.478 44.95h-11.39l8.394-43.93c.35-2.199.523-4.34.523-6.432 0-3.896-.75-6.772-2.283-8.609-1.522-1.846-4.15-2.769-7.869-2.769-5.558 0-11.11 2.453-16.658 7.355-5.548 4.903-9.528 12.545-11.956 22.908l-6.395 31.477h-11.39zM176.118 128.736l3.397-17.18c3.456 1.622 6.84 2.847 10.148 3.674 3.309.828 6.393 1.242 9.237 1.242 7.697 0 14.037-2.093 19.037-6.284 5-4.19 8.686-10.795 11.044-19.853l.984-4.165c-4.12 5.263-8.67 9.235-13.636 11.903-4.966 2.669-10.198 4.003-15.684 4.003-7.538 0-13.297-2.475-17.259-7.426-3.973-4.951-5.96-11.853-5.96-20.72 0-11.886 3.523-22.007 10.559-30.323 7.046-8.339 15.607-12.501 25.687-12.501 5.57 0 10.175 1.404 13.793 4.197 3.63 2.794 5.878 6.644 6.779 11.534l3.47-14.065h10.695l-13.322 67.48c-2.952 14.555-8.277 25.148-15.94 31.763-7.675 6.593-18.09 9.899-31.233 9.899-3.427 0-6.955-.34-10.56-1.036-3.617-.684-7.21-1.7-10.758-3.06l.522-1.082zm27.442-36.485c6.82 0 12.616-2.66 17.387-7.984 4.782-5.323 7.162-12.07 7.162-20.218 0-5.74-1.459-10.176-4.399-13.327-2.94-3.14-7.121-4.709-12.543-4.709-7.058 0-12.99 2.792-17.813 8.363-4.811 5.57-7.222 12.3-7.222 20.188 0 5.762 1.494 10.22 4.503 13.362 2.998 3.151 7.282 4.725 12.825 4.725l.1-.4z" fill="#232531" />
      </svg>
    ),
    color: "#777BB4",
  },
  "Tailwind CSS": {
    icon: (
      <svg className="size-4" viewBox="0 0 256 154" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 0C93.8 0 72.5 17.1 64 51.2c12.8-17.1 27.7-23.5 44.8-19.2 9.8 2.5 16.7 9.5 24.5 17.5C146 62.3 160.5 77 192 77c34.2 0 55.5-17.1 64-51.2-12.8 17.1-27.7 23.5-44.8 19.2-9.8-2.5-16.7-9.5-24.5-17.5C174 14.7 159.5 0 128 0zM64 77C29.8 77 8.5 94.1 0 128.2c12.8-17.1 27.7-23.5 44.8-19.2 9.8 2.5 16.7 9.5 24.5 17.5C82 139.3 96.5 154 128 154c34.2 0 55.5-17.1 64-51.2-12.8 17.1-27.7 23.5-44.8 19.2-9.8-2.5-16.7-9.5-24.5-17.5C110 91.7 95.5 77 64 77z" fill="#06B6D4" />
      </svg>
    ),
    color: "#06B6D4",
  },
  "C#": {
    icon: (
      <svg className="size-4" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#9B4F96" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z" />
        <path fill="#68217A" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z" />
        <path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6zM97 66.2l.9-4.3h-4.2v-4.7h5.1L100 51h4.9l-1.2 6.1h3.8l1.2-6.1h4.8l-1.2 6.1h2.4v4.7h-3.3l-.9 4.3h4.2v4.7h-5.1l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h-2.4v-4.7H97zm4.8 0h3.8l.9-4.3h-3.8l-.9 4.3z" />
      </svg>
    ),
    color: "#68217A",
  },
  "SQLite": {
    icon: (
      <svg className="size-4" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sqlite-original-a" x1="-15.615" x2="-6.741" y1="-9.108" y2="-9.108" gradientTransform="rotate(90 -90.486 64.634) scale(9.2712)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#95d7f4" offset="0" />
            <stop stopColor="#0f7fcc" offset=".92" />
            <stop stopColor="#0f7fcc" offset="1" />
          </linearGradient>
        </defs>
        <path d="M69.5 99.176c-.059-.73-.094-1.2-.094-1.2S67.2 83.087 64.57 78.642c-.414-.707.043-3.594 1.207-7.88.68 1.169 3.54 6.192 4.118 7.81.648 1.824.78 2.347.78 2.347s-1.57-8.082-4.144-12.797a162.286 162.286 0 012.004-6.265c.973 1.71 3.313 5.859 3.828 7.3.102.293.192.543.27.774.023-.137.05-.274.074-.414-.59-2.504-1.75-6.86-3.336-10.082 3.52-18.328 15.531-42.824 27.84-53.754H16.9c-5.387 0-9.789 4.406-9.789 9.789v88.57c0 5.383 4.406 9.789 9.79 9.789h52.897a118.657 118.657 0 01-.297-14.652" fill="#0b7fcc" />
        <path d="M65.777 70.762c.68 1.168 3.54 6.188 4.117 7.809.649 1.824.781 2.347.781 2.347s-1.57-8.082-4.144-12.797a164.535 164.535 0 012.004-6.27c.887 1.567 2.922 5.169 3.652 6.872l.082-.961c-.648-2.496-1.633-5.766-2.898-8.328 3.242-16.871 13.68-38.97 24.926-50.898H16.899a6.94 6.94 0 00-6.934 6.933v82.11c17.527-6.731 38.664-12.88 56.855-12.614-.672-2.605-1.441-4.96-2.25-6.324-.414-.707.043-3.597 1.207-7.879" fill="url(#sqlite-original-a)" />
        <path d="M115.95 2.781c-5.5-4.906-12.164-2.933-18.734 2.899a44.347 44.347 0 00-2.914 2.859c-11.25 11.926-21.684 34.023-24.926 50.895 1.262 2.563 2.25 5.832 2.894 8.328.168.64.32 1.242.442 1.754.285 1.207.437 1.996.437 1.996s-.101-.383-.515-1.582c-.078-.23-.168-.484-.27-.773-.043-.125-.105-.274-.172-.434-.734-1.703-2.765-5.305-3.656-6.867-.762 2.25-1.437 4.36-2.004 6.265 2.578 4.715 4.149 12.797 4.149 12.797s-.137-.523-.782-2.347c-.578-1.621-3.441-6.64-4.117-7.809-1.164 4.281-1.625 7.172-1.207 7.88.809 1.362 1.574 3.722 2.25 6.323 1.524 5.867 2.586 13.012 2.586 13.012s.031.469.094 1.2a118.653 118.653 0 00.297 14.651c.504 6.11 1.453 11.363 2.664 14.172l.828-.449c-1.781-5.535-2.504-12.793-2.188-21.156.48-12.793 3.422-28.215 8.856-44.289 9.191-24.27 21.938-43.738 33.602-53.035-10.633 9.602-25.023 40.684-29.332 52.195-4.82 12.891-8.238 24.984-10.301 36.574 3.55-10.863 15.047-15.53 15.047-15.53s5.637-6.958 12.227-16.888c-3.95.903-10.43 2.442-12.598 3.352-3.2 1.344-4.067 1.8-4.067 1.8s10.371-6.312 19.27-9.171c12.234-19.27 25.562-46.648 12.141-58.621" fill="#003956" />
      </svg>
    ),
    color: "#0b7fcc",
  },
  Turso: {
    icon: <img src={tursoIcon} alt="Turso" className="size-4 object-contain" />,
    color: "#00E599",
  },
  Render: {
    icon: <img src={renderIcon} alt="Render" className="size-4 object-contain" />,
    color: "#46E3B7",
  },
  Java: {
    icon: (
      <svg className="size-4" viewBox="0 0 256 346" xmlns="http://www.w3.org/2000/svg">
        <path d="M82.554 267.473s-13.198 7.675 9.393 10.272c27.369 3.122 41.356 2.675 71.517-3.034 0 0 7.93 4.972 19.003 9.279-67.611 28.977-153.019-1.679-99.913-16.517M74.292 229.659s-14.803 10.958 7.805 13.296c29.236 3.016 52.324 3.263 92.276-4.43 0 0 5.526 5.602 14.215 8.666-81.747 23.904-172.842 1.885-114.296-17.532" fill="#5382A1" />
        <path d="M143.942 165.515c16.66 19.18-4.377 36.44-4.377 36.44s42.301-21.837 22.874-49.183c-18.144-25.5-32.059-38.172 43.268-81.858 0 0-118.238 29.53-61.765 94.601" fill="#E76F00" />
        <path d="M233.364 295.442s9.767 8.047-10.757 14.273c-39.026 11.823-162.432 15.393-196.714.471-12.323-5.36 10.787-12.8 18.056-14.362 7.581-1.644 11.914-1.337 11.914-1.337-13.705-9.655-88.583 18.957-38.034 27.15 137.853 22.356 251.292-10.066 215.535-26.195M88.9 190.48s-62.771 14.907-22.228 20.323c17.118 2.292 51.243 1.774 83.03-.89 25.978-2.19 52.063-6.85 52.063-6.85s-9.16 3.923-15.787 8.448c-63.744 16.765-186.886 8.966-151.435-8.183 29.981-14.492 54.357-12.848 54.357-12.848M201.506 253.422c64.8-33.672 34.839-66.03 13.927-61.67-5.126 1.066-7.411 1.991-7.411 1.991s1.903-2.98 5.537-4.27c41.37-14.545 73.187 42.897-13.355 65.647 0 0 1.003-.895 1.302-1.698" fill="#5382A1" />
        <path d="M162.439 0s35.887 35.89-34.037 91.101c-56.071 44.282-12.786 69.53-.023 98.377-32.73-29.53-56.75-55.526-40.635-79.72C111.395 74.612 176.918 57.393 162.439 0" fill="#E76F00" />
        <path d="M95.268 344.665c62.199 3.982 157.712-2.209 159.974-31.64 0 0-4.348 11.158-51.404 20.018-53.088 9.99-118.564 8.824-157.399 2.421 0 0 7.953 6.58 48.829 9.201" fill="#5382A1" />
      </svg>
    ),
    color: "#ED8B00",
  },
  "Spring Boot": {
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="#6DB33F" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.9 4.5a11.3 11.3 0 0 1-1.6 2.5A10.7 10.7 0 0 0 12 2.9a10.9 10.9 0 0 0-7.7 18.6l-.5.4c-.3.3-.6.5-.9.7a12 12 0 0 0 19-18.1ZM8.8 18.4c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1Zm10.7-2.6c-2.5 3.4-7.9 2.3-11.4 2.4 0 0-.6.1-1.2.1 0 0 .2-.1.5-.2 2.3-.8 3.4-1 4.8-1.7 2.6-1.3 5.3-4.3 5.8-7.3-1 2.9-4.1 5.4-6.9 6.5-1.9.7-5.4 1.4-5.4 1.4l-.2-.1c-2.4-1.2-2.5-6.5 1.9-8.2 1.9-.7 3.8-.3 5.9-.8 2.2-.5 4.8-2.2 5.9-4.3 1.2 3.7 2.7 9.6.3 12.2Z" />
      </svg>
    ),
    color: "#6DB33F",
  },
  ".NET 8": {
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#512BD4" />
        <text x="12" y="15.5" textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">
          .NET
        </text>
      </svg>
    ),
    color: "#512BD4",
  },
  Express: {
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11" fill="#18181b" stroke="currentColor" strokeWidth="1.2" />
        <text x="12" y="15.5" textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
          ex
        </text>
      </svg>
    ),
    color: "#94a3b8",
  },
  Jest: {
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="#C21325" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4.5 6.5 6.8 17 12 22l5.2-5 2.3-10.5L12 2zm0 3.2l4.4 2.6-1.4 6.7-3 2.9-3-2.9-1.4-6.7L12 5.2z" />
      </svg>
    ),
    color: "#C21325",
  },
  Streamlit: {
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="#FF4B4B" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L2 9l10 6 10-6-10-6zm0 9l-10 6h20l-10-6z" />
      </svg>
    ),
    color: "#FF4B4B",
  },
  Kotlin: {
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="kt-proj" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E44857" />
            <stop offset="50%" stopColor="#C711E1" />
            <stop offset="100%" stopColor="#7F52FF" />
          </linearGradient>
        </defs>
        <path d="M2 2h20L12 12l10 10H2V2z" fill="url(#kt-proj)" />
      </svg>
    ),
    color: "#7F52FF",
  },
};

const getTechIcon = (tag: string) => {
  const normalized = tag.trim();
  return (
    TECH_ICONS[normalized] || {
      icon: (
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16V12" />
          <path d="M12 8h.01" />
        </svg>
      ),
      color: "#94a3b8",
    }
  );
};

const SLIDES = ["description", "features"] as const;
type Slide = (typeof SLIDES)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSlide, setActiveSlide] = useState<Slide>("description");
  const [slideDir, setSlideDir] = useState<1 | -1>(1);

  const goToSlide = (slide: Slide) => {
    const currentIdx = SLIDES.indexOf(activeSlide);
    const nextIdx = SLIDES.indexOf(slide);
    setSlideDir(nextIdx > currentIdx ? 1 : -1);
    setActiveSlide(slide);
  };

  const handleToggle = () => {
    if (!isExpanded) setActiveSlide("description");
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % LOAD_MORE_STEP) * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-card border border-border/60 shadow-soft transition-all duration-300"
      style={{
        boxShadow: isHovered
          ? `0 10px 30px -10px ${project.themeColor}30, 0 1px 3px 0 ${project.themeColor}15`
          : undefined,
        borderColor: isHovered ? `${project.themeColor}40` : undefined,
      }}
    >
      {/* Dynamic top line */}
      <div
        className="h-1 w-full transition-all duration-300 shrink-0"
        style={{
          backgroundColor: project.themeColor,
          opacity: isHovered ? 1 : 0.6,
        }}
      />

      {/* Image container */}
      <div className="relative overflow-hidden aspect-[16/10] shrink-0 bg-black/5 dark:bg-black/30">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Circular Tech Icons floating over image */}
        <div className="absolute bottom-3 right-3 flex -space-x-1.5 z-10">
          {project.tags.map((tag) => {
            const info = getTechIcon(tag);
            return (
              <div
                key={tag}
                className="size-8 rounded-full bg-background/95 backdrop-blur-xs border border-border flex items-center justify-center shadow-md hover:-translate-y-1 hover:scale-110 transition-all duration-200 cursor-pointer"
                style={{ color: info.color }}
                title={tag}
              >
                {info.icon}
              </div>
            );
          })}
        </div>
      </div>

      {/* Body content */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <h3
            className="text-lg font-display font-bold mb-2.5 transition-colors duration-300"
            style={{ color: isHovered ? project.themeColor : "inherit" }}
          >
            {project.title}
          </h3>

          {/* Highlights (Features preview) */}
          <div className="mb-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
              <Server className="size-3" style={{ color: project.themeColor }} />
              Destaques
            </h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground/90">
              {project.features?.slice(0, 3).map((feat, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2
                    className="size-3.5 mt-0.5 shrink-0"
                    style={{ color: project.themeColor }}
                  />
                  <span className="line-clamp-2 leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Expanded carousel section */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-border/50">
                {/* Carousel header: title + arrows */}
                <div className="flex items-center justify-between mb-3">
                  <h4
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: project.themeColor }}
                  >
                    {activeSlide === "description" ? "Sobre o Projeto" : "Funcionalidades"}
                  </h4>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => goToSlide("description")}
                      disabled={activeSlide === "description"}
                      className="size-6 rounded-full flex items-center justify-center border border-border/60 text-muted-foreground transition-all duration-200 disabled:opacity-30 hover:not-disabled:border-current cursor-pointer"
                      style={{ color: project.themeColor }}
                      title="Descrição"
                    >
                      <ChevronLeft className="size-3.5" />
                    </button>
                    {/* Dot indicators */}
                    <div className="flex gap-1">
                      {SLIDES.map((s) => (
                        <button
                          key={s}
                          onClick={() => goToSlide(s)}
                          className="rounded-full transition-all duration-300 cursor-pointer"
                          style={{
                            width: activeSlide === s ? "16px" : "6px",
                            height: "6px",
                            backgroundColor:
                              activeSlide === s ? project.themeColor : "oklch(0.7 0 0 / 0.3)",
                          }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => goToSlide("features")}
                      disabled={activeSlide === "features"}
                      className="size-6 rounded-full flex items-center justify-center border border-border/60 text-muted-foreground transition-all duration-200 disabled:opacity-30 cursor-pointer"
                      style={{ color: project.themeColor }}
                      title="Funcionalidades"
                    >
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* Slide content */}
                <div className="relative overflow-hidden" style={{ minHeight: "80px" }}>
                  <AnimatePresence mode="wait" custom={slideDir}>
                    {activeSlide === "description" ? (
                      <motion.div
                        key="description"
                        custom={slideDir}
                        initial={{ opacity: 0, x: slideDir * 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: slideDir * -30 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <p className="text-xs text-muted-foreground/80 leading-relaxed">
                          {project.description}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.ul
                        key="features"
                        custom={slideDir}
                        initial={{ opacity: 0, x: slideDir * 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: slideDir * -30 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="space-y-1.5 text-xs text-muted-foreground/80"
                      >
                        {project.features?.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span
                              className="size-1.5 rounded-full mt-1.5 shrink-0"
                              style={{ backgroundColor: project.themeColor }}
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer controls & buttons */}
        <div className="pt-3 border-t border-border/40 flex flex-col gap-3">
          {/* Ver mais / Ver menos button */}
          <button
            onClick={handleToggle}
            className="flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors py-1 cursor-pointer w-full"
          >
            <span>{isExpanded ? "Ver menos" : "Ver mais"}</span>
            {isExpanded ? (
              <ChevronUp className="size-3.5" style={{ color: project.themeColor }} />
            ) : (
              <ChevronDown className="size-3.5" style={{ color: project.themeColor }} />
            )}
          </button>

          {/* Action buttons */}
          <div className={`grid gap-2.5 ${project.github && project.demo ? "grid-cols-2" : "grid-cols-1"}`}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-border text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer"
                style={{
                  borderColor: isHovered ? `${project.themeColor}50` : undefined,
                  color: isHovered ? project.themeColor : undefined,
                  backgroundColor: isHovered ? `${project.themeColor}0a` : undefined,
                }}
              >
                <Github className="size-4 shrink-0" />
                <span>Código</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl text-white transition-all duration-300 shadow-sm cursor-pointer"
                style={{
                  backgroundColor: project.themeColor,
                  boxShadow: isHovered ? `0 4px 12px -2px ${project.themeColor}40` : undefined,
                }}
              >
                <ExternalLink className="size-4 shrink-0" />
                <span>Prévia</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

const INITIAL_COUNT = 6;
const LOAD_MORE_STEP = 6;

export function Projects() {
  const [viewMode, setViewMode] = useState<"showcase" | "grid">("showcase");
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const carouselRef = useRef<CircularCarouselHandle>(null);

  const carouselItems = useMemo<CircularCarouselItem[]>(
    () =>
      projects.map((project) => ({
        src: project.image,
        alt: project.title,
        title: project.title,
        subtitle: project.tags.slice(0, 3).join(" • "),
      })),
    []
  );

  const activeProject = projects[activeIndex] ?? projects[0];
  const visibleProjects = projects.slice(0, visibleCount);
  const remainingCount = Math.max(0, projects.length - visibleCount);
  const nextBatchCount = Math.min(LOAD_MORE_STEP, remainingCount);
  const hasMore = remainingCount > 0;
  const isExpandedList = visibleCount > INITIAL_COUNT;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(projects.length, prev + LOAD_MORE_STEP));
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_COUNT);
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="projects" className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="[&>div]:mb-0">
            <SectionHeading
              eyebrow="Trabalhos selecionados"
              title="Projetos em Destaque"
              description="Navegue pela vitrine interativa para os lados ou alterne para a grade completa."
            />
          </div>

          <div className="inline-flex items-center self-start md:self-auto p-1 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setViewMode("showcase")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "showcase"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Orbit className="size-3.5" />
              Vitrine 3D
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="size-3.5" />
              Grade ({projects.length})
            </button>
          </div>
        </div>

        {viewMode === "showcase" ? (
          <div className="space-y-8">
            {/* 3D Vitrine Carousel */}
            <div className="relative rounded-3xl border border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none transition-colors duration-500"
                style={{
                  background: `radial-gradient(ellipse at 50% 45%, ${activeProject.themeColor ?? "#6366f1"}18 0%, transparent 65%)`,
                }}
              />

              <div className="relative h-[280px] sm:h-[340px] md:h-[390px] w-full">
                <CircularCarousel
                  ref={carouselRef}
                  items={carouselItems}
                  preset="cylinder"
                  intro="rise"
                  cardWidth={340}
                  aspectRatio={1.6}
                  gap={26}
                  tilt={-4}
                  perspective={2400}
                  autoplay="off"
                  snap={true}
                  pauseOnHover={true}
                  focusOnClick={true}
                  parallax={0.25}
                  stretch={0.35}
                  depthFade={0.55}
                  fadeColor="var(--surface)"
                  innerShade={0.75}
                  cornerRadius={14}
                  captions={false}
                  onChange={setActiveIndex}
                />

                {/* Left / Right navigation arrows */}
                <button
                  type="button"
                  onClick={() => carouselRef.current?.prev()}
                  aria-label="Projeto anterior"
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 size-10 sm:size-11 rounded-full border border-border/70 bg-background/85 backdrop-blur-md flex items-center justify-center text-foreground hover:scale-105 transition-transform shadow-md cursor-pointer"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => carouselRef.current?.next()}
                  aria-label="Próximo projeto"
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 size-10 sm:size-11 rounded-full border border-border/70 bg-background/85 backdrop-blur-md flex items-center justify-center text-foreground hover:scale-105 transition-transform shadow-md cursor-pointer"
                >
                  <ChevronRight className="size-5" />
                </button>

                {/* Bottom counter & hint */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-1.5 rounded-full border border-border/60 bg-background/80 backdrop-blur-md text-[11px] text-muted-foreground pointer-events-none">
                  <span className="font-bold text-foreground tabular-nums">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                  <span className="hidden sm:inline opacity-60">•</span>
                  <span className="hidden sm:inline">Arraste, clique em uma capa ou use as setas</span>
                </div>
              </div>
            </div>

            {/* Active Project Details Panel ("Cardápio" synced with carousel) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft"
              >
                <div
                  className="h-1 w-full"
                  style={{ backgroundColor: activeProject.themeColor || "#6366f1" }}
                />

                <div className="p-6 md:p-8 grid lg:grid-cols-12 gap-8 items-center">
                  {/* Cover Preview + Action Buttons */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <div className="relative overflow-hidden rounded-xl aspect-[16/10] border border-border/60 bg-black/20">
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute bottom-3 right-3 flex -space-x-1.5">
                        {activeProject.tags.map((tag) => {
                          const info = getTechIcon(tag);
                          return (
                            <div
                              key={tag}
                              className="size-8 rounded-full bg-background/95 backdrop-blur-xs border border-border flex items-center justify-center shadow-md"
                              style={{ color: info.color }}
                              title={tag}
                            >
                              {info.icon}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div
                      className={`grid gap-3 ${
                        activeProject.github && activeProject.demo ? "grid-cols-2" : "grid-cols-1"
                      }`}
                    >
                      {activeProject.github && (
                        <a
                          href={activeProject.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border border-border text-foreground hover:bg-white/5 transition-colors"
                          style={{ borderColor: `${activeProject.themeColor}45` }}
                        >
                          <Github className="size-4 shrink-0" />
                          <span>Código</span>
                        </a>
                      )}
                      {activeProject.demo && (
                        <a
                          href={activeProject.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl text-white shadow-sm transition-opacity hover:opacity-90"
                          style={{ backgroundColor: activeProject.themeColor }}
                        >
                          <ExternalLink className="size-4 shrink-0" />
                          <span>Prévia</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description, Features & Tech Pills */}
                  <div className="lg:col-span-7 flex flex-col gap-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3
                        className="text-2xl md:text-3xl font-display font-bold"
                        style={{ color: activeProject.themeColor }}
                      >
                        {activeProject.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => carouselRef.current?.prev()}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border/70 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="size-3.5" />
                          Anterior
                        </button>
                        <button
                          type="button"
                          onClick={() => carouselRef.current?.next()}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border/70 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          Próximo
                          <ChevronRight className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {activeProject.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {activeProject.tags.map((tag) => {
                        const info = getTechIcon(tag);
                        return (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-border/70 bg-background/60"
                          >
                            <span style={{ color: info.color }}>{info.icon}</span>
                            <span>{tag}</span>
                          </span>
                        );
                      })}
                    </div>

                    {activeProject.features && activeProject.features.length > 0 && (
                      <div className="pt-4 border-t border-border/50">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                          <Server className="size-3.5" style={{ color: activeProject.themeColor }} />
                          Destaques & Funcionalidades
                        </h4>
                        <ul className="grid sm:grid-cols-2 gap-2 text-xs md:text-sm text-muted-foreground/90">
                          {activeProject.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2
                                className="size-4 mt-0.5 shrink-0"
                                style={{ color: activeProject.themeColor }}
                              />
                              <span className="leading-snug">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick project selector pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {projects.map((proj, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={proj.title}
                    type="button"
                    onClick={() => carouselRef.current?.focusIndex(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                      isActive
                        ? "text-white border-transparent shadow-sm"
                        : "border-border/60 bg-card/60 text-muted-foreground hover:text-foreground"
                    }`}
                    style={isActive ? { backgroundColor: proj.themeColor || "#6366f1" } : undefined}
                  >
                    {proj.title}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
              {visibleProjects.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </div>

            {/* Load More / Show Less Buttons */}
            {(hasMore || isExpandedList) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-14 flex flex-wrap items-center justify-center gap-4"
              >
                {hasMore && (
                  <button
                    onClick={handleLoadMore}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm text-sm font-semibold text-foreground/80 hover:text-foreground transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    {/* Shimmer effect on hover */}
                    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                    {/* Left decorative line */}
                    <span className="hidden sm:block w-12 h-px bg-gradient-to-r from-transparent to-border/60 group-hover:to-primary/40 transition-colors duration-300" />

                    <span className="flex items-center gap-2">
                      <ChevronDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                      Carregar Mais Projetos
                      <span className="inline-flex items-center justify-center px-2 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                        +{nextBatchCount} de {remainingCount}
                      </span>
                    </span>

                    {/* Right decorative line */}
                    <span className="hidden sm:block w-12 h-px bg-gradient-to-l from-transparent to-border/60 group-hover:to-primary/40 transition-colors duration-300" />
                  </button>
                )}

                {isExpandedList && (
                  <button
                    onClick={handleShowLess}
                    className="group relative inline-flex items-center gap-2 px-6 py-4 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm text-sm font-semibold text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer"
                  >
                    <ChevronUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    Mostrar Menos
                  </button>
                )}
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

