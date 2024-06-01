import React from "react";

const Contact = () => {
  return (
    <>
      <section className="relative z-10 overflow-hidden  py-20 dark:bg-dark md:pt-32">
        <div className="container">
          <div className="-mx-4 flex flex-wrap lg:justify-between">
            <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
              <div className="mb-12 max-w-[570px] lg:mb-0">
                <span className="mb-4 block text-base font-semibold text-primary">
                  Contact Us
                </span>
                <h2 className="mb-6 text-[32px] font-bold uppercase text-dark dark:text-white sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                  GET IN TOUCH WITH US
                </h2>
                <p className="mb-9 text-base leading-relaxed text-body-color dark:text-dark-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eius tempor incididunt ut labore e dolore magna aliqua. Ut
                  enim adiqua minim veniam quis nostrud exercitation ullamco
                </p>
                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30.6 11.8002L17.7 3.5002C16.65 2.8502 15.3 2.8502 14.3 3.5002L1.39998 11.8002C0.899983 12.1502 0.749983 12.8502 1.04998 13.3502C1.39998 13.8502 2.09998 14.0002 2.59998 13.7002L3.44998 13.1502V25.8002C3.44998 27.5502 4.84998 28.9502 6.59998 28.9502H25.4C27.15 28.9502 28.55 27.5502 28.55 25.8002V13.1502L29.4 13.7002C29.6 13.8002 29.8 13.9002 30 13.9002C30.35 13.9002 30.75 13.7002 30.95 13.4002C31.3 12.8502 31.15 12.1502 30.6 11.8002ZM13.35 26.7502V18.5002C13.35 18.0002 13.75 17.6002 14.25 17.6002H17.75C18.25 17.6002 18.65 18.0002 18.65 18.5002V26.7502H13.35ZM26.3 25.8002C26.3 26.3002 25.9 26.7002 25.4 26.7002H20.9V18.5002C20.9 16.8002 19.5 15.4002 17.8 15.4002H14.3C12.6 15.4002 11.2 16.8002 11.2 18.5002V26.7502H6.69998C6.19998 26.7502 5.79998 26.3502 5.79998 25.8502V11.7002L15.5 5.4002C15.8 5.2002 16.2 5.2002 16.5 5.4002L26.3 11.7002V25.8002Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Our Location
                    </h4>
                    <p className="text-base text-body-color dark:text-dark-6">
                      99 S.t Jomblo Park Pekanbaru 28292. Indonesia
                    </p>
                  </div>
                </div>

                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_941_17577)">
                        <path
                          d="M24.3 31.1499C22.95 31.1499 21.4 30.7999 19.7 30.1499C16.3 28.7999 12.55 26.1999 9.19997 22.8499C5.84997 19.4999 3.24997 15.7499 1.89997 12.2999C0.39997 8.59994 0.54997 5.54994 2.29997 3.84994C2.34997 3.79994 2.44997 3.74994 2.49997 3.69994L6.69997 1.19994C7.74997 0.599942 9.09997 0.899942 9.79997 1.89994L12.75 6.29994C13.45 7.34994 13.15 8.74994 12.15 9.44994L10.35 10.6999C11.65 12.7999 15.35 17.9499 21.25 21.6499L22.35 20.0499C23.2 18.8499 24.55 18.4999 25.65 19.2499L30.05 22.1999C31.05 22.8999 31.35 24.2499 30.75 25.2999L28.25 29.4999C28.2 29.5999 28.15 29.6499 28.1 29.6999C27.2 30.6499 25.9 31.1499 24.3 31.1499ZM3.79997 5.54994C2.84997 6.59994 2.89997 8.74994 3.99997 11.4999C5.24997 14.6499 7.64997 18.0999 10.8 21.2499C13.9 24.3499 17.4 26.7499 20.5 27.9999C23.2 29.0999 25.35 29.1499 26.45 28.1999L28.85 24.0999C28.85 24.0499 28.85 24.0499 28.85 23.9999L24.45 21.0499C24.45 21.0499 24.35 21.0999 24.25 21.2499L23.15 22.8499C22.45 23.8499 21.1 24.1499 20.1 23.4999C13.8 19.5999 9.89997 14.1499 8.49997 11.9499C7.84997 10.8999 8.09997 9.54994 9.09997 8.84994L10.9 7.59994V7.54994L7.94997 3.14994C7.94997 3.09994 7.89997 3.09994 7.84997 3.14994L3.79997 5.54994Z"
                          fill="currentColor"
                        />
                        <path
                          d="M29.3 14.25C28.7 14.25 28.25 13.8 28.2 13.2C27.8 8.15003 23.65 4.10003 18.55 3.75003C17.95 3.70003 17.45 3.20003 17.5 2.55003C17.55 1.95003 18.05 1.45003 18.7 1.50003C24.9 1.90003 29.95 6.80003 30.45 13C30.5 13.6 30.05 14.15 29.4 14.2C29.4 14.25 29.35 14.25 29.3 14.25Z"
                          fill="currentColor"
                        />
                        <path
                          d="M24.35 14.7002C23.8 14.7002 23.3 14.3002 23.25 13.7002C22.95 11.0002 20.85 8.90018 18.15 8.55018C17.55 8.50018 17.1 7.90018 17.15 7.30018C17.2 6.70018 17.8 6.25018 18.4 6.30018C22.15 6.75018 25.05 9.65018 25.5 13.4002C25.55 14.0002 25.15 14.5502 24.5 14.6502C24.4 14.7002 24.35 14.7002 24.35 14.7002Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_941_17577">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Phone Number
                    </h4>
                    <p className="text-base text-body-color dark:text-dark-6">
                      (+62)81 414 257 9980
                    </p>
                  </div>
                </div>

                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28 4.7998H3.99998C2.29998 4.7998 0.849976 6.1998 0.849976 7.9498V24.1498C0.849976 25.8498 2.24998 27.2998 3.99998 27.2998H28C29.7 27.2998 31.15 25.8998 31.15 24.1498V7.8998C31.15 6.1998 29.7 4.7998 28 4.7998ZM28 7.0498C28.05 7.0498 28.1 7.0498 28.15 7.0498L16 14.8498L3.84998 7.0498C3.89998 7.0498 3.94998 7.0498 3.99998 7.0498H28ZM28 24.9498H3.99998C3.49998 24.9498 3.09998 24.5498 3.09998 24.0498V9.2498L14.8 16.7498C15.15 16.9998 15.55 17.0998 15.95 17.0998C16.35 17.0998 16.75 16.9998 17.1 16.7498L28.8 9.2498V24.0998C28.9 24.5998 28.5 24.9498 28 24.9498Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Email Address
                    </h4>
                    <p className="text-base text-body-color dark:text-dark-6">
                      info@yourdomain.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-8 mxlg:mb-10">
                        <h3 className="text-base font-semibold text-primary ">Redes Sociales</h3>

                        <div className="flex mt-4 -mx-1.5 ">
                            <a className="mx-1.5  transition-colors duration-300 transform hover:text-blue-500" href="#">
                                <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.6668 6.67334C18.0002 7.00001 17.3468 7.13268 16.6668 7.33334C15.9195 6.49001 14.8115 6.44334 13.7468 6.84201C12.6822 7.24068 11.9848 8.21534 12.0002 9.33334V10C9.83683 10.0553 7.91016 9.07001 6.66683 7.33334C6.66683 7.33334 3.87883 12.2887 9.3335 14.6667C8.0855 15.498 6.84083 16.0587 5.3335 16C7.53883 17.202 9.94216 17.6153 12.0228 17.0113C14.4095 16.318 16.3708 14.5293 17.1235 11.85C17.348 11.0351 17.4595 10.1932 17.4548 9.34801C17.4535 9.18201 18.4615 7.50001 18.6668 6.67268V6.67334Z" />
                                </svg>
                            </a>

                            <a className="mx-1.5  transition-colors duration-300 transform hover:text-blue-500" href="#">
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.2 8.80005C16.4731 8.80005 17.694 9.30576 18.5941 10.2059C19.4943 11.1061 20 12.327 20 13.6V19.2H16.8V13.6C16.8 13.1757 16.6315 12.7687 16.3314 12.4687C16.0313 12.1686 15.6244 12 15.2 12C14.7757 12 14.3687 12.1686 14.0687 12.4687C13.7686 12.7687 13.6 13.1757 13.6 13.6V19.2H10.4V13.6C10.4 12.327 10.9057 11.1061 11.8059 10.2059C12.7061 9.30576 13.927 8.80005 15.2 8.80005Z" fill="currentColor" />
                                    <path d="M7.2 9.6001H4V19.2001H7.2V9.6001Z" fill="currentColor" />
                                    <path d="M5.6 7.2C6.48366 7.2 7.2 6.48366 7.2 5.6C7.2 4.71634 6.48366 4 5.6 4C4.71634 4 4 4.71634 4 5.6C4 6.48366 4.71634 7.2 5.6 7.2Z" fill="currentColor" />
                                </svg>
                            </a>

                            <a className="mx-1.5  transition-colors duration-300 transform hover:text-blue-500" href="#">
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 10.2222V13.7778H9.66667V20H13.2222V13.7778H15.8889L16.7778 10.2222H13.2222V8.44444C13.2222 8.2087 13.3159 7.9826 13.4826 7.81591C13.6493 7.64921 13.8754 7.55556 14.1111 7.55556H16.7778V4H14.1111C12.9324 4 11.8019 4.46825 10.9684 5.30175C10.1349 6.13524 9.66667 7.2657 9.66667 8.44444V10.2222H7Z" fill="currentColor" />
                                </svg>
                            </a>

                            <a className="mx-1.5  transition-colors duration-300 transform hover:text-blue-500" href="#">
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9294 7.72275C9.65868 7.72275 7.82715 9.55428 7.82715 11.825C7.82715 14.0956 9.65868 15.9271 11.9294 15.9271C14.2 15.9271 16.0316 14.0956 16.0316 11.825C16.0316 9.55428 14.2 7.72275 11.9294 7.72275ZM11.9294 14.4919C10.462 14.4919 9.26239 13.2959 9.26239 11.825C9.26239 10.354 10.4584 9.15799 11.9294 9.15799C13.4003 9.15799 14.5963 10.354 14.5963 11.825C14.5963 13.2959 13.3967 14.4919 11.9294 14.4919ZM17.1562 7.55495C17.1562 8.08692 16.7277 8.51178 16.1994 8.51178C15.6674 8.51178 15.2425 8.08335 15.2425 7.55495C15.2425 7.02656 15.671 6.59813 16.1994 6.59813C16.7277 6.59813 17.1562 7.02656 17.1562 7.55495ZM19.8731 8.52606C19.8124 7.24434 19.5197 6.10901 18.5807 5.17361C17.6453 4.23821 16.51 3.94545 15.2282 3.88118C13.9073 3.80621 9.94787 3.80621 8.62689 3.88118C7.34874 3.94188 6.21341 4.23464 5.27444 5.17004C4.33547 6.10544 4.04628 7.24077 3.98201 8.52249C3.90704 9.84347 3.90704 13.8029 3.98201 15.1238C4.04271 16.4056 4.33547 17.5409 5.27444 18.4763C6.21341 19.4117 7.34517 19.7045 8.62689 19.7687C9.94787 19.8437 13.9073 19.8437 15.2282 19.7687C16.51 19.708 17.6453 19.4153 18.5807 18.4763C19.5161 17.5409 19.8089 16.4056 19.8731 15.1238C19.9481 13.8029 19.9481 9.84704 19.8731 8.52606ZM18.1665 16.5412C17.8881 17.241 17.349 17.7801 16.6456 18.0621C15.5924 18.4799 13.0932 18.3835 11.9294 18.3835C10.7655 18.3835 8.26272 18.4763 7.21307 18.0621C6.51331 17.7837 5.9742 17.2446 5.69215 16.5412C5.27444 15.488 5.37083 12.9888 5.37083 11.825C5.37083 10.6611 5.27801 8.15832 5.69215 7.10867C5.97063 6.40891 6.50974 5.8698 7.21307 5.58775C8.26629 5.17004 10.7655 5.26643 11.9294 5.26643C13.0932 5.26643 15.596 5.17361 16.6456 5.58775C17.3454 5.86623 17.8845 6.40534 18.1665 7.10867C18.5843 8.16189 18.4879 10.6611 18.4879 11.825C18.4879 12.9888 18.5843 15.4916 18.1665 16.5412Z" fill="currentColor" />
                                </svg>
                            </a>
                        </div>
                    </div>
            </div>
            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="relative rounded-lg bg-white p-8 shadow-lg dark:bg-dark-2 sm:p-12">
                <form>
                  <ContactInputBox
                    type="text"
                    name="name"
                    placeholder="Your Name"
                  />
                  <ContactInputBox
                    type="text"
                    name="email"
                    placeholder="Your Email"
                  />
                  <ContactTextArea
                    row="6"
                    placeholder="Your Message"
                    name="details"
                    defaultValue=""
                  />
                  <div>
                    <button
                      type="submit"
                      className="w-full rounded border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
                <div>
                  <span className="absolute -right-9 -top-10 z-[-1]">
                    <svg
                      width={100}
                      height={100}
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                        fill="#3056D3"
                      />
                    </svg>
                  </span>
                  <span className="absolute -right-10 top-[90px] z-[-1]">
                    <svg
                      width={34}
                      height={134}
                      viewBox="0 0 34 134"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="31.9993"
                        cy={132}
                        r="1.66667"
                        transform="rotate(180 31.9993 132)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy="117.333"
                        r="1.66667"
                        transform="rotate(180 31.9993 117.333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy="102.667"
                        r="1.66667"
                        transform="rotate(180 31.9993 102.667)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy={88}
                        r="1.66667"
                        transform="rotate(180 31.9993 88)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy="73.3333"
                        r="1.66667"
                        transform="rotate(180 31.9993 73.3333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy={45}
                        r="1.66667"
                        transform="rotate(180 31.9993 45)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy={16}
                        r="1.66667"
                        transform="rotate(180 31.9993 16)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy={59}
                        r="1.66667"
                        transform="rotate(180 31.9993 59)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy="30.6666"
                        r="1.66667"
                        transform="rotate(180 31.9993 30.6666)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy="1.66665"
                        r="1.66667"
                        transform="rotate(180 31.9993 1.66665)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy={132}
                        r="1.66667"
                        transform="rotate(180 17.3333 132)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy="117.333"
                        r="1.66667"
                        transform="rotate(180 17.3333 117.333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy="102.667"
                        r="1.66667"
                        transform="rotate(180 17.3333 102.667)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy={88}
                        r="1.66667"
                        transform="rotate(180 17.3333 88)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy="73.3333"
                        r="1.66667"
                        transform="rotate(180 17.3333 73.3333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy={45}
                        r="1.66667"
                        transform="rotate(180 17.3333 45)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy={16}
                        r="1.66667"
                        transform="rotate(180 17.3333 16)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy={59}
                        r="1.66667"
                        transform="rotate(180 17.3333 59)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy="30.6666"
                        r="1.66667"
                        transform="rotate(180 17.3333 30.6666)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy="1.66665"
                        r="1.66667"
                        transform="rotate(180 17.3333 1.66665)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy={132}
                        r="1.66667"
                        transform="rotate(180 2.66536 132)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy="117.333"
                        r="1.66667"
                        transform="rotate(180 2.66536 117.333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy="102.667"
                        r="1.66667"
                        transform="rotate(180 2.66536 102.667)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy={88}
                        r="1.66667"
                        transform="rotate(180 2.66536 88)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy="73.3333"
                        r="1.66667"
                        transform="rotate(180 2.66536 73.3333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy={45}
                        r="1.66667"
                        transform="rotate(180 2.66536 45)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy={16}
                        r="1.66667"
                        transform="rotate(180 2.66536 16)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy={59}
                        r="1.66667"
                        transform="rotate(180 2.66536 59)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy="30.6666"
                        r="1.66667"
                        transform="rotate(180 2.66536 30.6666)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy="1.66665"
                        r="1.66667"
                        transform="rotate(180 2.66536 1.66665)"
                        fill="#13C296"
                      />
                    </svg>
                  </span>
                  <span className="absolute -bottom-7 -left-7 z-[-1]">
                    <svg
                      width={107}
                      height={134}
                      viewBox="0 0 107 134"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="104.999"
                        cy={132}
                        r="1.66667"
                        transform="rotate(180 104.999 132)"
                        fill="#13C296"
                      />
                      <circle
                        cx="104.999"
                        cy="117.333"
                        r="1.66667"
                        transform="rotate(180 104.999 117.333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="104.999"
                        cy="102.667"
                        r="1.66667"
                        transform="rotate(180 104.999 102.667)"
                        fill="#13C296"
                      />
                      <circle
                        cx="104.999"
                        cy={88}
                        r="1.66667"
                        transform="rotate(180 104.999 88)"
                        fill="#13C296"
                      />
                      <circle
                        cx="104.999"
                        cy="73.3333"
                        r="1.66667"
                        transform="rotate(180 104.999 73.3333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="104.999"
                        cy={45}
                        r="1.66667"
                        transform="rotate(180 104.999 45)"
                        fill="#13C296"
                      />
                      <circle
                        cx="104.999"
                        cy={16}
                        r="1.66667"
                        transform="rotate(180 104.999 16)"
                        fill="#13C296"
                      />
                      <circle
                        cx="104.999"
                        cy={59}
                        r="1.66667"
                        transform="rotate(180 104.999 59)"
                        fill="#13C296"
                      />
                      <circle
                        cx="104.999"
                        cy="30.6666"
                        r="1.66667"
                        transform="rotate(180 104.999 30.6666)"
                        fill="#13C296"
                      />
                      <circle
                        cx="104.999"
                        cy="1.66665"
                        r="1.66667"
                        transform="rotate(180 104.999 1.66665)"
                        fill="#13C296"
                      />
                      <circle
                        cx="90.3333"
                        cy={132}
                        r="1.66667"
                        transform="rotate(180 90.3333 132)"
                        fill="#13C296"
                      />
                      <circle
                        cx="90.3333"
                        cy="117.333"
                        r="1.66667"
                        transform="rotate(180 90.3333 117.333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="90.3333"
                        cy="102.667"
                        r="1.66667"
                        transform="rotate(180 90.3333 102.667)"
                        fill="#13C296"
                      />
                      <circle
                        cx="90.3333"
                        cy={88}
                        r="1.66667"
                        transform="rotate(180 90.3333 88)"
                        fill="#13C296"
                      />
                      <circle
                        cx="90.3333"
                        cy="73.3333"
                        r="1.66667"
                        transform="rotate(180 90.3333 73.3333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="90.3333"
                        cy={45}
                        r="1.66667"
                        transform="rotate(180 90.3333 45)"
                        fill="#13C296"
                      />
                      <circle
                        cx="90.3333"
                        cy={16}
                        r="1.66667"
                        transform="rotate(180 90.3333 16)"
                        fill="#13C296"
                      />
                      <circle
                        cx="90.3333"
                        cy={59}
                        r="1.66667"
                        transform="rotate(180 90.3333 59)"
                        fill="#13C296"
                      />
                      <circle
                        cx="90.3333"
                        cy="30.6666"
                        r="1.66667"
                        transform="rotate(180 90.3333 30.6666)"
                        fill="#13C296"
                      />
                      <circle
                        cx="90.3333"
                        cy="1.66665"
                        r="1.66667"
                        transform="rotate(180 90.3333 1.66665)"
                        fill="#13C296"
                      />
                      <circle
                        cx="75.6654"
                        cy={132}
                        r="1.66667"
                        transform="rotate(180 75.6654 132)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy={132}
                        r="1.66667"
                        transform="rotate(180 31.9993 132)"
                        fill="#13C296"
                      />
                      <circle
                        cx="75.6654"
                        cy="117.333"
                        r="1.66667"
                        transform="rotate(180 75.6654 117.333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy="117.333"
                        r="1.66667"
                        transform="rotate(180 31.9993 117.333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="75.6654"
                        cy="102.667"
                        r="1.66667"
                        transform="rotate(180 75.6654 102.667)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy="102.667"
                        r="1.66667"
                        transform="rotate(180 31.9993 102.667)"
                        fill="#13C296"
                      />
                      <circle
                        cx="75.6654"
                        cy={88}
                        r="1.66667"
                        transform="rotate(180 75.6654 88)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy={88}
                        r="1.66667"
                        transform="rotate(180 31.9993 88)"
                        fill="#13C296"
                      />
                      <circle
                        cx="75.6654"
                        cy="73.3333"
                        r="1.66667"
                        transform="rotate(180 75.6654 73.3333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy="73.3333"
                        r="1.66667"
                        transform="rotate(180 31.9993 73.3333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="75.6654"
                        cy={45}
                        r="1.66667"
                        transform="rotate(180 75.6654 45)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy={45}
                        r="1.66667"
                        transform="rotate(180 31.9993 45)"
                        fill="#13C296"
                      />
                      <circle
                        cx="75.6654"
                        cy={16}
                        r="1.66667"
                        transform="rotate(180 75.6654 16)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy={16}
                        r="1.66667"
                        transform="rotate(180 31.9993 16)"
                        fill="#13C296"
                      />
                      <circle
                        cx="75.6654"
                        cy={59}
                        r="1.66667"
                        transform="rotate(180 75.6654 59)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy={59}
                        r="1.66667"
                        transform="rotate(180 31.9993 59)"
                        fill="#13C296"
                      />
                      <circle
                        cx="75.6654"
                        cy="30.6666"
                        r="1.66667"
                        transform="rotate(180 75.6654 30.6666)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy="30.6666"
                        r="1.66667"
                        transform="rotate(180 31.9993 30.6666)"
                        fill="#13C296"
                      />
                      <circle
                        cx="75.6654"
                        cy="1.66665"
                        r="1.66667"
                        transform="rotate(180 75.6654 1.66665)"
                        fill="#13C296"
                      />
                      <circle
                        cx="31.9993"
                        cy="1.66665"
                        r="1.66667"
                        transform="rotate(180 31.9993 1.66665)"
                        fill="#13C296"
                      />
                      <circle
                        cx="60.9993"
                        cy={132}
                        r="1.66667"
                        transform="rotate(180 60.9993 132)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy={132}
                        r="1.66667"
                        transform="rotate(180 17.3333 132)"
                        fill="#13C296"
                      />
                      <circle
                        cx="60.9993"
                        cy="117.333"
                        r="1.66667"
                        transform="rotate(180 60.9993 117.333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy="117.333"
                        r="1.66667"
                        transform="rotate(180 17.3333 117.333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="60.9993"
                        cy="102.667"
                        r="1.66667"
                        transform="rotate(180 60.9993 102.667)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy="102.667"
                        r="1.66667"
                        transform="rotate(180 17.3333 102.667)"
                        fill="#13C296"
                      />
                      <circle
                        cx="60.9993"
                        cy={88}
                        r="1.66667"
                        transform="rotate(180 60.9993 88)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy={88}
                        r="1.66667"
                        transform="rotate(180 17.3333 88)"
                        fill="#13C296"
                      />
                      <circle
                        cx="60.9993"
                        cy="73.3333"
                        r="1.66667"
                        transform="rotate(180 60.9993 73.3333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy="73.3333"
                        r="1.66667"
                        transform="rotate(180 17.3333 73.3333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="60.9993"
                        cy={45}
                        r="1.66667"
                        transform="rotate(180 60.9993 45)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy={45}
                        r="1.66667"
                        transform="rotate(180 17.3333 45)"
                        fill="#13C296"
                      />
                      <circle
                        cx="60.9993"
                        cy={16}
                        r="1.66667"
                        transform="rotate(180 60.9993 16)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy={16}
                        r="1.66667"
                        transform="rotate(180 17.3333 16)"
                        fill="#13C296"
                      />
                      <circle
                        cx="60.9993"
                        cy={59}
                        r="1.66667"
                        transform="rotate(180 60.9993 59)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy={59}
                        r="1.66667"
                        transform="rotate(180 17.3333 59)"
                        fill="#13C296"
                      />
                      <circle
                        cx="60.9993"
                        cy="30.6666"
                        r="1.66667"
                        transform="rotate(180 60.9993 30.6666)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy="30.6666"
                        r="1.66667"
                        transform="rotate(180 17.3333 30.6666)"
                        fill="#13C296"
                      />
                      <circle
                        cx="60.9993"
                        cy="1.66665"
                        r="1.66667"
                        transform="rotate(180 60.9993 1.66665)"
                        fill="#13C296"
                      />
                      <circle
                        cx="17.3333"
                        cy="1.66665"
                        r="1.66667"
                        transform="rotate(180 17.3333 1.66665)"
                        fill="#13C296"
                      />
                      <circle
                        cx="46.3333"
                        cy={132}
                        r="1.66667"
                        transform="rotate(180 46.3333 132)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy={132}
                        r="1.66667"
                        transform="rotate(180 2.66536 132)"
                        fill="#13C296"
                      />
                      <circle
                        cx="46.3333"
                        cy="117.333"
                        r="1.66667"
                        transform="rotate(180 46.3333 117.333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy="117.333"
                        r="1.66667"
                        transform="rotate(180 2.66536 117.333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="46.3333"
                        cy="102.667"
                        r="1.66667"
                        transform="rotate(180 46.3333 102.667)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy="102.667"
                        r="1.66667"
                        transform="rotate(180 2.66536 102.667)"
                        fill="#13C296"
                      />
                      <circle
                        cx="46.3333"
                        cy={88}
                        r="1.66667"
                        transform="rotate(180 46.3333 88)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy={88}
                        r="1.66667"
                        transform="rotate(180 2.66536 88)"
                        fill="#13C296"
                      />
                      <circle
                        cx="46.3333"
                        cy="73.3333"
                        r="1.66667"
                        transform="rotate(180 46.3333 73.3333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy="73.3333"
                        r="1.66667"
                        transform="rotate(180 2.66536 73.3333)"
                        fill="#13C296"
                      />
                      <circle
                        cx="46.3333"
                        cy={45}
                        r="1.66667"
                        transform="rotate(180 46.3333 45)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy={45}
                        r="1.66667"
                        transform="rotate(180 2.66536 45)"
                        fill="#13C296"
                      />
                      <circle
                        cx="46.3333"
                        cy={16}
                        r="1.66667"
                        transform="rotate(180 46.3333 16)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy={16}
                        r="1.66667"
                        transform="rotate(180 2.66536 16)"
                        fill="#13C296"
                      />
                      <circle
                        cx="46.3333"
                        cy={59}
                        r="1.66667"
                        transform="rotate(180 46.3333 59)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy={59}
                        r="1.66667"
                        transform="rotate(180 2.66536 59)"
                        fill="#13C296"
                      />
                      <circle
                        cx="46.3333"
                        cy="30.6666"
                        r="1.66667"
                        transform="rotate(180 46.3333 30.6666)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy="30.6666"
                        r="1.66667"
                        transform="rotate(180 2.66536 30.6666)"
                        fill="#13C296"
                      />
                      <circle
                        cx="46.3333"
                        cy="1.66665"
                        r="1.66667"
                        transform="rotate(180 46.3333 1.66665)"
                        fill="#13C296"
                      />
                      <circle
                        cx="2.66536"
                        cy="1.66665"
                        r="1.66667"
                        transform="rotate(180 2.66536 1.66665)"
                        fill="#13C296"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

const ContactTextArea = ({ row, placeholder, name, defaultValue }:{row:any,placeholder:any,name:any,defaultValue:any}) => {
  return (
    <>
      <div className="mb-6">
        <textarea
          rows={row}
          placeholder={placeholder}
          name={name}
          className="w-full resize-none rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
          defaultValue={defaultValue}
        />
      </div>
    </>
  );
};

const ContactInputBox = ({ type, placeholder, name }:{type:any,placeholder:any,name:any}) => {
  return (
    <>
      <div className="mb-6">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
        />
      </div>
    </>
  );
};
