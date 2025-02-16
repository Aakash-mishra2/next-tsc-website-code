const CategorySeoText = ({ isSEOText }) => {
  return (
    <div id="product-layout" className="text-sm text-justify mx-4 my-5">
      {isSEOText?.description &&
        isSEOText?.description.map((desc, idx) => {
          return (
            <div key={idx}>
              <div
                key={idx}
                className="text-xl lg:text-2xl font-bold py-2"
                dangerouslySetInnerHTML={{ __html: `${desc?.title}` }}
              />
              {desc?.short_description.map((short, idx) => {
                return (
                  <div
                    key={idx}
                    className="pb-2"
                    dangerouslySetInnerHTML={{ __html: `${short}` }}
                  />
                );
              })}
            </div>
          );
        })}
      {isSEOText?.describe.map((desc, idx) => {
        return (
          <div key={idx}>
            {desc?.extra && (
              <>
                <div
                  className="text-xl lg:text-2xl font-bold py-2"
                  dangerouslySetInnerHTML={{
                    __html: `${desc?.extra?.title}`,
                  }}
                />
                <div
                  className="pb-2"
                  dangerouslySetInnerHTML={{
                    __html: `${desc?.extra?.short_description}`,
                  }}
                />
              </>
            )}
            <div
              className="text-xl lg:text-2xl font-bold py-2"
              dangerouslySetInnerHTML={{ __html: `${desc?.title}` }}
            />
            <div
              className="pb-2"
              dangerouslySetInnerHTML={{ __html: `${desc?.description}` }}
            />
            {desc?.list.map((item, idxn) => {
              return (
                <div key={idxn}>
                  <div className="text-lg pb-2 flex justify-start items-start gap-2">
                    {idxn + 1}.
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${item?.list_title}`,
                      }}
                    />
                  </div>
                  <div
                    className="pb-2"
                    dangerouslySetInnerHTML={{
                      __html: `${item?.list_description}`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
      {isSEOText?.title_footer && (
        <p className="py-3">{isSEOText?.title_footer}</p>
      )}
      {isSEOText?.extra &&
        isSEOText?.extra.map((desc, idx) => {
          return (
            <div key={idx}>
              <div
                className="text-xl lg:text-2xl font-bold py-2"
                dangerouslySetInnerHTML={{ __html: `${desc?.title}` }}
              />
              {desc?.short_description.map((short, idx) => {
                return (
                  <div
                    key={idx}
                    className="pb-2"
                    dangerouslySetInnerHTML={{ __html: `${short}` }}
                  />
                );
              })}
            </div>
          );
        })}
      {isSEOText?.outlook && (
        <>
          <h2 className="text-xl lg:text-2xl font-bold py-2">Outlook</h2>
          <div
            className="pb-2"
            dangerouslySetInnerHTML={{
              __html: `${isSEOText?.outlook}`,
            }}
          />
        </>
      )}
      <div className="text-left w-full mt-5">
        {isSEOText?.faqs && (
          <h3 className="text-2xl lg:text-3xl lg:mt-2 font-bold">
            Frequently Asked Questions
          </h3>
        )}
        <div className="mt-5">
          {isSEOText?.faqs &&
            isSEOText?.faqs.map((e, idx) => {
              return (
                <div key={idx} className="text-justify">
                  <div className="text-lg md:text-xl font-bold pb-2 flex justify-start items-start gap-2">
                    {idx + 1}.
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${e?.question}`,
                      }}
                    />
                  </div>
                  <div
                    className="pb-2 pl-2 md:pl-5"
                    dangerouslySetInnerHTML={{
                      __html: `${e?.description}`,
                    }}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CategorySeoText;
