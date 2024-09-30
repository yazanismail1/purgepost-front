import React from 'react';


export default function page() {
  return (
    <div class="max-w-7xl mx-auto p-8">
      <h1 class="text-4xl font-bold mb-6 text-center">Terms and Conditions</h1>
      <p class="mb-6 text-center text-gray-600">Effective Date: <span class="font-semibold">September 30, 2024</span></p>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p class="mb-4">By accessing and using PurgePost.com (“we,” “our,” “us”) and its services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, you should not use our services.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">2. Service Overview</h2>
        <p class="mb-4">PurgePost.com allows users to connect their social media accounts, specifically Instagram, to retrieve comments, analyze feedback using OpenAI, and manage or delete negative comments.</p>
        <p class="mb-4">We reserve the right to modify, suspend, or discontinue the service at any time without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of the service.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">3. User Accounts</h2>
        <p class="mb-4">To access our services, you must create an account by providing accurate and complete information, including your email address. You are responsible for maintaining the confidentiality of your account credentials, and you agree to notify us immediately of any unauthorized use of your account.</p>
        <p class="mb-4">We reserve the right to terminate or suspend your account if you violate these Terms and Conditions.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">4. Fees and Payments</h2>
        <p class="mb-4">Certain features of PurgePost.com are provided for a fee. If you choose to use paid features, you agree to provide accurate billing information. Payments are processed securely through <a href="https://stripe.com" class="text-blue-600 hover:underline" target="_blank">Stripe</a>, and by using our services, you agree to Stripe’s <a href="https://stripe.com/privacy" class="text-blue-600 hover:underline" target="_blank">Privacy Policy</a> and Terms of Service.</p>
        <p class="mb-4">All fees are non-refundable, except as required by law or at our discretion. We reserve the right to change our pricing at any time. Any changes to pricing will be communicated to you before taking effect.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">5. Use of Third-Party Services</h2>
        <p class="mb-4">PurgePost.com integrates third-party services, including:</p>

        <h3 class="text-xl font-semibold mb-2">1. Instagram API</h3>
        <p class="mb-4">We use the Instagram API to retrieve posts, comments, and other data. By using our services, you agree to Instagram’s <a href="https://privacycenter.instagram.com/policy" class="text-blue-600 hover:underline" target="_blank">Privacy Policy</a> and Terms of Service.</p>

        <h3 class="text-xl font-semibold mb-2">2. OpenAI</h3>
        <p class="mb-4">We use OpenAI’s API to analyze your comments and detect negative feedback. You acknowledge that OpenAI may process your data, but it does not store it. Your interactions with OpenAI are governed by their <a href="https://openai.com/policies/privacy-policy" class="text-blue-600 hover:underline" target="_blank">Privacy Policy</a>.</p>

        <h3 class="text-xl font-semibold mb-2">3. Stripe</h3>
        <p class="mb-4">Payments are processed securely via Stripe. By using Stripe for payment processing, you agree to their <a href="https://stripe.com/privacy" class="text-blue-600 hover:underline" target="_blank">Privacy Policy</a> and Terms of Service.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">6. Data and Privacy</h2>
        <p class="mb-4">Your use of PurgePost.com is subject to our <a href="/privacy-policy" class="text-blue-600 hover:underline">Privacy Policy</a>. We take reasonable steps to protect your data, but you acknowledge that the transmission of information over the Internet is never completely secure.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
        <p class="mb-4">To the maximum extent permitted by law, PurgePost.com and its affiliates shall not be liable for any indirect, incidental, special, or consequential damages, including but not limited to damages for loss of profits, data, or goodwill, arising out of or related to your use of the service.</p>
        <p class="mb-4">We make no warranties or representations about the accuracy or completeness of the service’s content or the content of any third-party sites linked to the service.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">8. Termination</h2>
        <p class="mb-4">We reserve the right to terminate or suspend your access to PurgePost.com without notice if you violate these Terms and Conditions or engage in any unauthorized activities. Upon termination, your right to use the service will cease immediately.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">9. Changes to the Terms</h2>
        <p class="mb-4">We may update these Terms and Conditions from time to time. Any changes will be posted on this page, and you are encouraged to review the Terms periodically. Your continued use of PurgePost.com after changes to the Terms constitutes your acceptance of the new terms.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">10. Governing Law</h2>
        <p class="mb-4">These Terms and Conditions are governed by and construed in accordance with the laws of Jordan, without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the courts located in Jordan to resolve any legal matters arising from these terms.</p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">11. Contact Information</h2>
        <p>If you have any questions about these Terms and Conditions, please contact us:</p>
        <p class="mt-4">
          <strong>Purge Post Team</strong><br/>
            Email: <a href="mailto:yazanismial@gmail.com" class="text-blue-600 hover:underline">yazanismial@gmail.com</a>
        </p>
      </section>
    </div>

  );
};