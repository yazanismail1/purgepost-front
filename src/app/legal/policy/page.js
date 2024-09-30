import React from 'react';


export default function page() {
  return (
    <div class="max-w-7xl mx-auto p-8">
      <h1 class="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p class="mb-6 text-center text-gray-600">Effective Date: <span class="font-semibold">September 30, 2024</span></p>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Introduction</h2>
        <p class="mb-4">Welcome to PurgePost.com (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information.</p>
        <p>By using our services, you agree to the collection and use of information in accordance with this policy.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Information We Collect</h2>
        <h3 class="text-xl font-semibold mb-2">1. Personal Information:</h3>
        <ul class="list-disc list-inside mb-4">
          <li><strong>Email Address:</strong> We collect your email address when you sign up for our services.</li>
          <li><strong>Authentication Data:</strong> When you authenticate using third-party platforms (e.g., Instagram), we collect the necessary authentication tokens to access your data.</li>
        </ul>
        <h3 class="text-xl font-semibold mb-2">2. Usage Data:</h3>
        <ul class="list-disc list-inside mb-4">
          <li><strong>Log Data:</strong> We collect information about your interactions with our service, including log files, usage data, and actions performed (e.g., retrieving posts or deleting comments).</li>
          <li><strong>Device Data:</strong> We collect data about the device you use to access our service, including IP addresses, browser types, and operating systems.</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <p class="mb-4">We use the information we collect in the following ways:</p>
        <ul class="list-disc list-inside mb-4">
          <li>To provide and maintain our services.</li>
          <li>To manage your account and authenticate your identity.</li>
          <li>To improve the functionality and features of our service.</li>
          <li>To send you important updates and notifications regarding your account or our services.</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Third-Party Services</h2>
        <p class="mb-4">We use third-party services to enhance our offerings, including:</p>

        <h3 class="text-xl font-semibold mb-2">1. Instagram API</h3>
        <p class="mb-4">We integrate with the Instagram API to retrieve data such as posts, comments, and other information from your Instagram account. This data is used to provide core functionalities of our service, including analyzing and moderating comments. Your use of the Instagram API is subject to Instagram&apos;s <a href="https://privacycenter.instagram.com/policy" class="text-blue-600 hover:underline" target="_blank">Privacy Policy</a>.</p>

        <h3 class="text-xl font-semibold mb-2">2. OpenAI</h3>
        <p class="mb-4">We utilize OpenAI to process and analyze comments on your social media posts to detect negative feedback. OpenAI may process data temporarily, but it is not stored by them. Your interactions with OpenAI are bound by their <a href="https://openai.com/policies/privacy-policy" class="text-blue-600 hover:underline" target="_blank">Privacy Policy</a>.</p>

        <h3 class="text-xl font-semibold mb-2">3. Stripe</h3>
        <p class="mb-4">We use Stripe for secure payment processing. Stripe collects your payment details directly and securely. We do not store your credit card information. For more details, please review <a href="https://stripe.com/privacy" class="text-blue-600 hover:underline" target="_blank">Stripe&apos;s Privacy Policy</a>.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Data Sharing and Disclosure</h2>
        <p class="mb-4">We do not sell, rent, or share your personal information with third parties except as necessary for the operation of our services. However, we may disclose information:</p>
        <ul class="list-disc list-inside mb-4">
          <li>To comply with legal obligations.</li>
          <li>To protect and defend the rights or property of PurgePost.com.</li>
          <li>To prevent or investigate possible wrongdoing in connection with the service.</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Data Security</h2>
        <p class="mb-4">We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or destruction. However, no method of transmission over the Internet or method of electronic storage is completely secure, and we cannot guarantee its absolute security.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Your Rights</h2>
        <p class="mb-4">You have the right to:</p>
        <ul class="list-disc list-inside mb-4">
          <li>Access the personal information we hold about you.</li>
          <li>Request the correction of any inaccurate or incomplete data.</li>
          <li>Request the deletion of your personal information (subject to legal obligations).</li>
        </ul>
        <p class="mb-4">If you would like to exercise any of these rights, please contact us at <strong>yazanismial@gmail.com</strong>.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Data Retention</h2>
        <p class="mb-4">We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
        <p class="mb-4">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with the updated effective date.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
        <p class="mt-4">
          <strong>Purge Post Team</strong><br/>
            Email: <a href="mailto:yazanismial@gmail.com" class="text-blue-600 hover:underline">yazanismial@gmail.com</a>
        </p>
      </section>
    </div>
  );
};