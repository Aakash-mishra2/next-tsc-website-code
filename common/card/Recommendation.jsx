const filterProducts = (order, related_products) => {
  const updated = [];
  related_products.map((e, idx) =>
    updated.push({ ...e, order: order[idx] ? order[idx] : idx + 1 })
  );
  return updated.sort((a, b) => a?.order - b?.order);
};

const Recommendation = ({
  theme,
  title,
  order,
  trackOrderPage,
  related_products,
  componentToBeRender: Component,
}) => {
  const products =
    order && order.length > 0
      ? filterProducts(order, related_products.reverse())
      : related_products && related_products.length > 0 && !trackOrderPage
      ? related_products.reverse()
      : related_products;
  return (
    <>
      {products && products.length > 0 && (
        <>
          <h4 className="text-xl md:text-3xl font-bold mx-3 md:mx-8 lg:mx-24 mb-5">
            {title}
          </h4>
          <div className="flex flex-wrap mx-2 md:mx-8 lg:mx-20">
            {products.map((item) => {
              return (
                <div
                  key={item.id}
                  className="w-1/2 md:w-1/3 lg:w-1/4 p-1 lg:p-3"
                >
                  <Component
                    theme={theme}
                    key={item.id}
                    product={item}
                    cardStarSize={20}
                    isNotSwiperProduct={true}
                    cardDescriptionSize={"text-md xss:text-lg md:text-2xl lg:text-xl"}
                    productBriefHeight={"h-32 xss:h-28 md:h-32 lg:h-36"}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Recommendation;
