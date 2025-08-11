export default function Contact() {
  return (
    <section className="sticky top-0 h-screen xl:flex items-center justify-center bg-black text-[#00ADB5]">
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex-col items-center w-[38rem]">
          <h1 className="text-6xl mb-5">Got project in mind?</h1>
          <div className="bg-transparent w-full h-[20rem] border-dashed border-white border-8 flex justify-center items-center">
            <h1 className="text-3xl">IMAGE</h1>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[38rem]">
          <form className="w-full h-full flex-col">
            <div className="flex justify-between w-full h-full mb-5">
              <div className="flex-col basis-5/12">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full px-4 py-4 mt-2 rounded-md outline-none text-black"
                />
              </div>
              <div className="flex-col basis-5/12">
                <label>Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-4 mt-2 rounded-md outline-none text-black"
                />
              </div>
            </div>
            <div className="flex-col">
              <label>Your Message</label>
              <textarea
                name="message"
                placeholder="Message"
                className="w-full px-4 py-4 mt-2 rounded-md outline-none text-black"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-6 py-4 bg-[#00ADB5] text-white rounded-md hover:text-black"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
