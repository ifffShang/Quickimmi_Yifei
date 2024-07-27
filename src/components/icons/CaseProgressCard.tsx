import React from "react";

interface IconProps {
  color?: string;
}

export const CollectInfoIcon: React.FC<IconProps> = ({ color = "#F2994A" }) => (
  <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="29" stroke={color} strokeWidth="2" />
    <svg x="18" y="18" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.7574 2.99679L14.7574 4.99679H5V18.9968H19V9.23943L21 7.23943V19.9968C21 20.5491 20.5523 20.9968 20 20.9968H4C3.44772 20.9968 3 20.5491 3 19.9968V3.99679C3 3.4445 3.44772 2.99679 4 2.99679H16.7574ZM20.4853 2.09729L21.8995 3.51151L12.7071 12.7039L11.2954 12.7063L11.2929 11.2897L20.4853 2.09729Z"
        fill={color}
      />
    </svg>
  </svg>
);

export const ReviewIcon: React.FC<IconProps> = ({ color = "#E0E0E0" }) => (
  <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="29" stroke={color} strokeWidth="2" />
    <svg x="18" y="18" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 3C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.455L2 22.5V4C2 3.44772 2.44772 3 3 3H21ZM20 5H4V18.385L5.76333 17H20V5ZM10.5153 7.4116L10.9616 8.1004C9.29402 9.0027 9.32317 10.4519 9.32317 10.7645C9.47827 10.7431 9.64107 10.7403 9.80236 10.7553C10.7045 10.8389 11.4156 11.5795 11.4156 12.5C11.4156 13.4665 10.6321 14.25 9.66558 14.25C9.12905 14.25 8.61598 14.0048 8.29171 13.6605C7.77658 13.1137 7.5 12.5 7.5 11.5052C7.5 9.75543 8.72825 8.18684 10.5153 7.4116ZM15.5153 7.4116L15.9616 8.1004C14.294 9.0027 14.3232 10.4519 14.3232 10.7645C14.4783 10.7431 14.6411 10.7403 14.8024 10.7553C15.7045 10.8389 16.4156 11.5795 16.4156 12.5C16.4156 13.4665 15.6321 14.25 14.6656 14.25C14.1291 14.25 13.616 14.0048 13.2917 13.6605C12.7766 13.1137 12.5 12.5 12.5 11.5052C12.5 9.75543 13.7283 8.18684 15.5153 7.4116Z"
        fill={color}
      />
    </svg>
  </svg>
);

export const SubmitIcon: React.FC<IconProps> = ({ color = "#E0E0E0" }) => (
  <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="29" stroke={color} strokeWidth="2" />
    <svg x="18" y="18" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"
        fill={color}
      />
    </svg>
  </svg>
);

export const FingerPrintIcon: React.FC<IconProps> = ({ color = "#E0E0E0" }) => (
  <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="29" stroke={color} strokeWidth="2" />
    <svg x="18" y="18" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.298 22 8.69525 21.5748 7.29229 20.8248L2 22L3.17629 16.7097C2.42562 15.3063 2 13.7028 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 13.3347 4.32563 14.6181 4.93987 15.7664L5.28952 16.4201L4.63445 19.3663L7.58189 18.7118L8.23518 19.061C9.38315 19.6747 10.6659 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM13 7V12H17V14H11V7H13Z"
        fill={color}
      />
    </svg>
  </svg>
);

export const ResultIcon: React.FC<IconProps> = ({ color = "#E0E0E0" }) => (
  <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="29" stroke={color} strokeWidth="2" />
    <svg x="18" y="18" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 18H21V6H3V18ZM1 5C1 4.44772 1.44772 4 2 4H22C22.5523 4 23 4.44772 23 5V19C23 19.5523 22.5523 20 22 20H2C1.44772 20 1 19.5523 1 19V5ZM9 10C9 9.44772 8.55228 9 8 9C7.44772 9 7 9.44772 7 10C7 10.5523 7.44772 11 8 11C8.55228 11 9 10.5523 9 10ZM11 10C11 11.6569 9.65685 13 8 13C6.34315 13 5 11.6569 5 10C5 8.34315 6.34315 7 8 7C9.65685 7 11 8.34315 11 10ZM8.0018 16C7.03503 16 6.1614 16.3907 5.52693 17.0251L4.11272 15.6109C5.10693 14.6167 6.4833 14 8.0018 14C9.52031 14 10.8967 14.6167 11.8909 15.6109L10.4767 17.0251C9.84221 16.3907 8.96858 16 8.0018 16ZM16.2071 14.7071L20.2071 10.7071L18.7929 9.29289L15.5 12.5858L13.7071 10.7929L12.2929 12.2071L14.7929 14.7071L15.5 15.4142L16.2071 14.7071Z"
        fill={color}
      />
    </svg>
  </svg>
);
