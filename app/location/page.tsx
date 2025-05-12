import React from "react";

export default function Location() {
  return (
    <div className="mx-auto w-full max-w-[1400px] mt-10">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12687.943946363279!2d127.95823007291114!3d37.34284045355579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3563757a03476097%3A0x9c31f3cd552a8ac3!2z6rCV7JuQ7Yq567OE7J6Q7LmY64-EIOybkOyjvOyLnCDrtInsgrDroZwgMTQ1!5e0!3m2!1sko!2skr!4v1746772985963!5m2!1sko!2skr"
        width="100%"
        height="450"
        style={{ border: "0" }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
