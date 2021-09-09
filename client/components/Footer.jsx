export default function Footer({ className }) {
  return (
    <div
      className={`${className}  justify-between text-sm text-gray-700 dark:text-gray-300 w-full`}
    >
      <span>
        created by{" "}
        <a
          className="underline"
          href="https://devchallenges.io/portfolio/Hussein-Mourad"
        >
          Hussein-Mourad
        </a>
      </span>
      <a href="https://devchallenges.io">devchallenges.io</a>
    </div>
  );
}
