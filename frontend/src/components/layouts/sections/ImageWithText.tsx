import Header from '../../common/text/Header';

function ImageWithText( { image, header, reversed, children }: any) {
    return (
      <div
        className={`max-w-6xl mx-auto flex flex-col-reverse ${
          reversed ? "md:flex-row-reverse" : "md:flex-row"
        } justify-center items-center`}
      >
        <div className="w-full md:w-1/2">
          <img
            src={image}
            alt=""
            className="w-full mx-auto max-w-xl md:px-10"
          />
        </div>
        <div className="flex flex-col gap-5 w-full md:w-1/2 p-10 md:max-w-md">
          <Header>{header}</Header>
          {children}
        </div>
      </div>
    );
}

export default ImageWithText;