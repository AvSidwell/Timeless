<template>
  <div>
    <div class="mb-5">
      <form action="https://formspree.io/f/mvojredq" method="POST">
        <label for="name">Your Name:</label>
        <input type="text" id="name" required />

        <label>
          Your email:
          <input type="email" name="email" required />
        </label>
        <label for="subject">Subject:</label>
        <input type="text" id="subject" required />
        <label>
          Your message:
          <textarea name="message" required></textarea>

          <label for="phone">Phone Number:</label>
          <input type="tel" id="phone" required />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>

form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #9ba38b;
  border-radius: 5px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  box-shadow: 2px 2px 2px #2b2828;
}
form:hover {
  background-color: #2b2828;
}
form:hover label {
  color: #e9e9e9;
}
label {
  display: block;
  color:  #2b2828;
  margin-bottom: 8px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid   #e9e9e9;
  border-radius: 4px;
  font-size: 16px;
}

button[type="submit"] {
  background-color: #2b2828;
  color: #e9e9e9;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color:  #e9e9e9;
  color: #2b2828;
}
</style>
