import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Share2, ThumbsUp } from "lucide-react";
import React from "react";

function Post() {
  return (
    <article
      className="px-4 pt-6 pb-10 md:pt-24 mx-auto max-w-7xl"
      itemID="#"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="w-full mx-auto mb-12 text-left md:w-3/4 lg:w-3/4">
        <img
          src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600"
          className="object-cover w-full h-80 bg-center rounded-lg"
          alt="Kutty"
        />
        <p className="mt-6 mb-2 text-xs font-semibold tracking-wider uppercase text-primary">
          Development
        </p>
        <h1
          className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl"
          itemProp="headline"
          title="Rise of Tailwind - A Utility First CSS Framework"
        >
          Rise of Tailwind - A Utility First CSS Framework
        </h1>
        <div className="flex mb-6 space-x-2">
          <a
            className="text-gray-900 bg-gray-100 badge rounded-md px-2 hover:bg-gray-200"
            href="#"
          >
            CSS
          </a>
          <a
            className="text-gray-900 bg-gray-100 badge rounded-md px-2 hover:bg-gray-200"
            href="#"
          >
            Tailwind
          </a>
          <a
            className="text-gray-900 bg-gray-100 badge rounded-md px-2 hover:bg-gray-200"
            href="#"
          >
            AlpineJS
          </a>
        </div>
        <a className="flex items-center text-gray-700" href="#">
          <div className="avatar">
          <Avatar className="h-16 w-16 ">
                <AvatarFallback className="text-xl"></AvatarFallback>
              </Avatar>
          </div>
          <div className="ml-2">
            <p className="text-sm font-semibold text-gray-800">Praveen Juge</p>
            <p className="text-sm text-gray-500">Jan 02 2021</p>
          </div>
        </a>
      </div>

      <div className="w-full mx-auto md:w-3/4 lg:w-3/4 space-y-1 leading-8">
        <p>
          What if there is an easy way to achieve responsive UI without using
          any UI kit? Can we create new and fresh designs for every project with
          a CSS framework? Enter Tailwind CSS, will this be the perfect CSS
          framework, well let’s find out.
        </p>
        <p>
          Tailwind is a utility-first CSS framework, the keyword being
          ‘utility’. It is basically a set of classNamees that you can use in
          your HTML. This approach allows for rapid UI development without the
          need for custom CSS. Instead of writing custom styles, you can
          compose complex designs directly in your markup using utility
          classes.
        </p>
        <p>
          Therefore, we don’t have to write any custom CSS to get this button.
          This can be heavily extended to build whole web applications without
          the need for any other styles apart from a tailwind. The utility-first
          approach allows for a more modular and maintainable codebase, making it
          easier to scale and adapt to changing requirements.
        </p>
        <p>
          Tailwind CSS is highly customizable. You can configure your design
          system directly in your tailwind.config.js file. This allows you to
          define your own design tokens, such as colors, spacing, and typography,
          which can be used consistently across your project. This level of
          customization makes Tailwind CSS a powerful tool for both designers
          and developers.
        </p>
        <p>
          Additionally, Tailwind CSS comes with a powerful set of plugins that
          can extend its functionality. For example, you can use the @tailwindcss/typography
          plugin to add vertical rhythm and logical defaults to build beautiful,
          readable content. There are also plugins for forms, aspects ratios,
          and more.
        </p>
        <p>
          In conclusion, Tailwind CSS offers a unique approach to styling that
          can greatly enhance the efficiency and maintainability of your web
          projects. Its utility-first philosophy, combined with its extensive
          customization options and powerful plugins, makes it a versatile and
          valuable tool for modern web development.
        </p>
      </div>
      <div className="flex justify-around items-center mt-8">
        <div className="flex space-x-4">
          <Button variant="outline" size="sm">
            <ThumbsUp className="mr-2 h-4 w-4" />
            Me gusta
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Comentar
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Compartir
        </Button>
      </div>
    </article>
  );
}

export default Post;

