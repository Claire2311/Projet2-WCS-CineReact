import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <div className="grow text-xl text-white bg-b4 flex flex-col items-center w-full">
      <div className="max-w-4xl w-full text-3xl mt-3 ml-2">
        <h1>Contactez-nous</h1>
      </div>
      <div className="w-full">
        <ContactForm />
      </div>
    </div>
  );
}
