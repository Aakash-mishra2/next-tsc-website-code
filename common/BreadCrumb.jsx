import Link from "next/link";

const BreadCrumb = ({ breadCrumb }) => {
  return (
    <div className="flex flex-wrap gap-1 text-sm tracking-tight">
      <p className="flex gap-1">
        <Link className="underline underline-offset-2" href={"/"}>
          Home{" "}
        </Link>{" "}
        &nbsp;&nbsp;{`>`}&nbsp;&nbsp;
      </p>
      {breadCrumb?.b_list.map((bread, idx) => {
        const isActive = bread.active;
        const isShow = bread?.show;
        return (
          <span className="flex flex-wrap" key={idx}>
            {isActive ? (
              <>
                <Link
                  className="underline underline-offset-2"
                  href={`${bread?.url}`}
                >
                  {bread?.name}{" "}
                </Link>
                {breadCrumb?.b_list.length > 1 && (
                  <span>&nbsp;&nbsp; {`>`} &nbsp;&nbsp;</span>
                )}
              </>
            ) : (
              <h1>{!isShow && <>{bread?.name}</>}</h1>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
