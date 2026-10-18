/* Lighthouse — Student Course (grades 6–12, self-paced) */
const SCHOOL = 'rsu99.org';
const lnk = (href, text, flag) => `<a class="fake-link" data-href="${href}"${flag ? ` data-flag="${flag}"` : ''}>${text}</a>`;

window.COURSE = {
  id: 'student',
  audience: 'student',
  chip: 'Student Course',
  certCode: 'S',
  lockModules: true,
  partner: 'Developed by Harper Steenstra &middot; In partnership with the Maine Department of Education',
  audienceLine: 'Grades 6&ndash;12 &middot; Self-paced',
  eyebrow: 'Student Course &middot; Grades 6&ndash;12',
  title: 'Spot it. Stop it. <em>Tell someone.</em>',
  lead: 'Learn to catch phishing, protect your accounts, post smart, and know exactly who to go to when something online feels wrong. Work at your own pace. Your progress saves on this device.',
  heroMeta: [['clock', 'About 45 minutes'], ['layers', '5 modules'], ['award', 'Certificate at the end']],
  certSub: 'Student Cybersecurity Course',
  certBlurb: 'Finish all five modules to unlock a printable certificate with your name on it.',
  certBody: 'has successfully completed <b>Lighthouse: Cybersecurity Readiness for Maine Schools</b>, demonstrating the ability to recognize phishing and scams, protect personal accounts, make responsible choices about what to share online, and identify trusted adults to tell when something goes wrong.',
  homeExtra: () => `<div class="section-head"><div><h2>How this works</h2><p>Everything here is a simulation. No real emails, accounts, or links.</p></div></div>
    <div class="points" style="margin-top:0">
      <div class="point"><div class="ic">${icon('target')}</div><h4>Try things out</h4><p>Open fake inboxes, hover over links, and pick out the scams. Mistakes are how you learn here.</p></div>
      <div class="point"><div class="ic">${icon('talk')}</div><h4>Some questions have no single answer</h4><p>When a situation is complicated, you will see how different choices play out instead of a score.</p></div>
      <div class="point"><div class="ic">${icon('lock')}</div><h4>Your progress stays here</h4><p>Nothing you type leaves this device. Come back on the same computer and pick up where you left off.</p></div>
      <div class="point"><div class="ic">${icon('award')}</div><h4>Earn your certificate</h4><p>Finish every module to print a certificate or save it as a PDF for your teacher.</p></div>
    </div>`,

  modules: [
    /* ------------------------------------------------------------------ */
    {
      title: 'Spot the Phish',
      art: 'phish',
      minutes: 12,
      summary: 'Fake emails and links are built to look real. Learn the five tells and test yourself in a simulated inbox.',
      doneLine: 'You can now read a link like a pro. Up next: keeping your accounts locked down.',
      steps: [
        { kind: 'cover', nav: 'Welcome', art: 'phish', eyebrow: 'Module 1', title: 'Spot the Phish',
          body: 'Phishing is when someone sends a fake message to trick you into clicking a link, giving up a password, or sharing personal info. It is the number one way accounts get stolen.',
          goals: ['Name the five warning signs of a phishing message', 'Find the real domain hiding inside any link', 'Know what to do if you already clicked'],
          meta: [['clock', '12 minutes'], ['target', '6 activities']] },

        { kind: 'lesson', nav: 'The five tells', eyebrow: 'Learn', title: 'Five signs a message is trying to hook you',
          prompt: 'Scammers are not trying to fool everyone. They only need one person to click. These five patterns show up again and again.',
          points: [
            { icon: 'clock', title: 'Rush and pressure', text: '"Act now," "final notice," "your account will be deleted in 24 hours." Panic makes people skip thinking.' },
            { icon: 'user', title: 'Sender does not match', text: 'The name says your school, but the actual email address is from some other website.' },
            { icon: 'link', title: 'Links that lie', text: 'The words you see can say anything. Hover to see where a link really goes before you click.' },
            { icon: 'gift', title: 'Too good to be true', text: 'Free game currency, gift cards, prizes you never entered to win. If it seems amazing, be suspicious.' },
            { icon: 'key', title: 'Asks for private info', text: 'Real schools and companies do not ask you to "verify" your password or birthday by email.' }
          ],
          callout: 'Phishing is not just email. It shows up in texts, game chats, DMs, comments, and even QR codes on posters.' },

        { kind: 'spot', nav: 'Find the red flags', eyebrow: 'Activity', title: 'Find the red flags',
          hint: 'Start with who sent it. Look at the email address in the angle brackets, not the name. Then hover over the link.',
          prompt: 'This email landed in your school inbox this morning. Click on everything that looks suspicious. There are five red flags hiding in it.',
          visual: { type: 'email', window: 'Harborview Mail',
            from: { name: 'Harborview IT Support', addr: 'it-helpdesk@rsu99-support.com', flag: 'sender', color: '#2459d6' },
            subject: 'FINAL NOTICE: Your account will be deactivated in 24 hours', subjectFlag: 'urgent', time: '7:12 AM', to: 'me',
            body: `<p>Dear Student,</p>
              <p>Our system has detected unusual activity on your school account. <span data-flag="threat">If you do not act within 24 hours, your account will be permanently deactivated and you will lose access to all grades, assignments, and email.</span></p>
              <p>To keep your account, click below and <span data-flag="info">confirm your password and date of birth</span>:</p>
              <p>${lnk('http://rsu99-login.verify-acct.co/session?id=88213', 'https://' + SCHOOL + '/account/verify', 'link')}</p>
              <p>Thank you for your cooperation.</p>
              <div class="sig">Harborview IT Support Team<br>Do not reply to this message.</div>` },
          flags: {
            sender: { title: 'Fake sender address', text: 'Real school emails end in @rsu99.org. This one ends in rsu99-support.com, a totally different website.' },
            urgent: { title: 'Panic in the subject line', text: '"FINAL NOTICE" and a 24-hour deadline are there to rush you.' },
            threat: { title: 'Scary threat', text: 'Losing all your grades is meant to make you panic and click without thinking.' },
            info: { title: 'Asks for your password', text: 'Your school will never ask for your password or birthday over email.' },
            link: { title: 'The link lies', text: 'It shows the school address, but hover over it: it really goes to verify-acct.co.' },
          },
          wrap: 'Notice how the link text looked completely normal? That is why you always hover before you click. On a phone, press and hold a link to preview it.' },

        { kind: 'inbox', nav: 'Sort the inbox', eyebrow: 'Activity', title: 'Safe or phishing? You decide.',
          hint: 'For each email, ask two questions. Does the address end in exactly @rsu99.org? Is it asking me to log in, pay, or claim something? Two of the four are scams.',
          prompt: 'Here is a real-looking student inbox. Open each email, check the sender and links, then report it or mark it safe. Not everything is a scam.',
          window: 'Harborview Mail',
          emails: [
            { from: { name: 'Ms. Rivera', addr: 'arivera@' + SCHOOL, color: '#138a4b' }, time: '8:04 AM', verdict: 'safe',
              subject: 'Lab report due Friday + rubric', preview: 'Hi everyone, quick reminder that your density lab...',
              body: `<p>Hi everyone,</p><p>Quick reminder that your density lab report is due Friday at the start of class. The rubric is posted on our class page:</p><p>${lnk('https://' + SCHOOL + '/science/rivera/rubric', 'Lab Report Rubric')}</p><p>Come see me during flex block if you have questions.</p><div class="sig">Ms. Rivera<br>Science, Room 214</div>`,
              explain: 'This is a normal message from a teacher.', good: ['Sent from a real school address, arivera@rsu99.org', 'You were expecting it: it is about your actual class', 'The link goes to the school website, and nothing asks for a password'] },
            { from: { name: 'R0BUX Rewards', addr: 'rewards@robIox-giftcenter.net', color: '#c8322b' }, time: '7:41 AM', verdict: 'phish',
              subject: 'You were selected: 10,000 FREE Robux', preview: 'Congratulations! Claim your reward before it expires...',
              body: `<p><b>CONGRATULATIONS!!</b></p><p>Your account was <span data-flag="prize">randomly selected to receive 10,000 FREE Robux</span>. This offer <span data-flag="rush">expires in 2 hours</span>.</p><p>${lnk('http://robIox-giftcenter.net/claim/login', '<span class="btnlink">Claim My Robux</span>', 'link')}</p><p>Log in with your username and password to receive your reward instantly.</p>`,
              explain: 'Free game currency is one of the most common scams aimed at students.',
              flags: { prize: { title: 'Too good to be true', text: 'Nobody gives away 10,000 Robux for nothing.' }, rush: { title: 'Fake deadline', text: '"Expires in 2 hours" is pressure.' }, link: { title: 'Lookalike website', text: 'robIox uses a capital I instead of an l. It is a copycat site built to steal your login.' } } },
            { from: { name: 'Harborview Athletics', addr: 'athletics@' + SCHOOL, color: '#8b1d1d' }, time: 'Yesterday', verdict: 'safe',
              subject: 'Practice moved to 4:30 today', preview: 'Because of the field maintenance, all fall practices...',
              body: `<p>Because of field maintenance, all fall practices today will start at 4:30 instead of 3:30. Buses will run on the normal schedule.</p><p>Questions? Stop by the athletics office.</p><div class="sig">Harborview Athletics Department</div>`,
              explain: 'This is a real announcement.', good: ['Comes from the official school address', 'No links, no attachments, nothing to log in to', 'It only shares information. It does not ask you to do anything risky'] },
            { from: { name: 'Delivery Notice', addr: 'notice@parcel-redeliver-track.info', color: '#b86e00' }, time: 'Yesterday', verdict: 'phish',
              subject: 'Your package could not be delivered', preview: 'We attempted to deliver your package but no one...',
              body: `<p>We attempted to deliver <span data-flag="nopkg">your package</span> today but no one was available.</p><p>To schedule redelivery, <span data-flag="pay">pay the $1.99 redelivery fee</span> using the link below:</p><p>${lnk('http://parcel-redeliver-track.info/pay', 'Schedule Redelivery', 'link')}</p>`,
              explain: 'Fake delivery messages are extremely common in email and texts.',
              flags: { nopkg: { title: 'What package?', text: 'If you did not order anything, that is your first clue.' }, pay: { title: 'Asks for payment info', text: 'The small fee is a trick to get a card number.' }, link: { title: 'Random domain', text: 'parcel-redeliver-track.info is not a real shipping company.' } } }
          ],
          wrap: 'Real messages tend to be expected, come from addresses you recognize, and do not ask for passwords. When you are unsure, ask a teacher before you click.' },

        { kind: 'urlbreak', nav: 'Read a link', eyebrow: 'Activity', title: 'Find the real domain',
          prompt: 'Scammers stick real names onto the front of fake links. For each link, click the piece that shows who really owns the website.',
          hint: 'Only the white pieces can be clicked. The gray ones (https:// and everything after the slash) never decide who owns a site.',
          urls: [
            { parts: ['https://', 'www.', 'amazon.com', '/orders/112-4471'], answer: 2, explain: 'This one is legit. The piece right before the slash is <span class="mono">amazon.com</span>.' },
            { parts: ['https://', 'instagram.', 'com-security-alert.co', '/verify'], answer: 2, explain: 'Sneaky. It starts with "instagram" but the real owner is <span class="mono">com-security-alert.co</span>. The dot after "instagram" makes it just a label.' },
            { parts: ['https://', 'rsu99.org.', 'secure-check.net', '/login'], answer: 2, explain: 'rsu99.org is just a label stuck on the front. This site belongs to <span class="mono">secure-check.net</span>.' }
          ] },

        { kind: 'linkpick', nav: 'Which link is fake?', eyebrow: 'Activity', title: 'Which search result is the phish?',
          prompt: 'You need to check your grades, so you search for your school portal. One of these results is a fake site set up to steal student logins. Hover over each one, then click the phishing result.',
          hint: 'Look for the word Sponsored. Then check which addresses end in the real school domain, rsu99.org.',
          search: 'rsu 99 student portal login', ask: 'phish', answer: 0,
          options: [
            { ad: true, site: 'RSU 99 Portal Login', display: 'rsu99-portal-login.com', href: 'https://rsu99-portal-login.com/signin', color: '#7c3aed',
              title: 'RSU 99 Student Portal Login | Fast Secure Access', snippet: 'Log in to the RSU 99 student portal in seconds. Check grades, schedules, and assignments. Official access point.',
              realDomain: 'rsu99-portal-login.com', why: 'A paid ad pretending to be official. Anyone can buy an ad, and this domain is not the school\'s.' },
            { site: 'RSU 99 Schools', display: SCHOOL + ' › portal', href: 'https://' + SCHOOL + '/portal', color: '#2459d6',
              title: 'Student Portal - RSU 99', snippet: 'Students and families can view grades, attendance, and schedules. Use your school username and password.',
              realDomain: SCHOOL, why: 'This is the real district domain, rsu99.org, with nothing added.' },
            { site: 'RSU 99 Tech Help', display: 'help.' + SCHOOL + ' › student-portal', href: 'https://help.' + SCHOOL + '/student-portal', color: '#0e7490',
              title: 'Trouble logging in? Student portal help', snippet: 'Forgot your password? Reset it with your teacher or visit the library tech desk.',
              realDomain: 'help.' + SCHOOL, why: '"help." is just a section of the real school website, so this is safe.' }
          ],
          explain: 'The top result is not always the right one. Sponsored ads can be phishing, so check the domain every time.' },

        { kind: 'linkpick', layout: 'windows', nav: 'Spot the fake page', eyebrow: 'Activity', title: 'Three sign-in pages. One is fake.',
          prompt: 'A link took you to a login page. Scammers can copy how a page looks perfectly, but they cannot copy the address. Read each address bar and click the fake one.',
          hint: 'Read each address slowly. The real one ends in exactly rsu99.org. Watch for extra dashes and endings like .net.',
          ask: 'phish', answer: 1,
          options: [
            { url: '<b>' + SCHOOL + '</b>/login', brand: 'RSU 99 Sign In', mark: 'RSU', color: '#14305e', foot: 'Regional School Unit 99',
              realDomain: SCHOOL, why: 'The real school domain, with nothing extra.' },
            { url: '<b>rsu99-org.net</b>/login', brand: 'RSU 99 Sign In', mark: 'RSU', color: '#14305e', foot: 'Regional School Unit 99',
              realDomain: 'rsu99-org.net', why: 'Look closely: it has a dash where the dot should be, and it ends in .net instead of .org. Same logo, fake site.' },
            { url: 'login.<b>' + SCHOOL + '</b>', brand: 'RSU 99 Sign In', mark: 'RSU', color: '#14305e', foot: 'Regional School Unit 99',
              realDomain: SCHOOL, why: '"login." is a section of the real school site. Safe.' }
          ],
          explain: 'All three pages look identical. That is the point. The address bar is the only thing you can trust.' },

        { kind: 'choice', nav: 'Oops, I clicked', eyebrow: 'Check your thinking', title: 'What if you already fell for it?',
          prompt: 'It happens to adults and experts too. What matters is what you do next.',
          question: 'You typed your school password into a page, then realized it was fake. What should you do first?',
          options: [
            { text: 'Close the page and hope nothing happens.', fb: 'The scammer already has your password. Waiting gives them time to use it.' },
            { text: 'Tell a teacher or the school tech team right away, and change your password.', correct: true, fb: 'Yes. Telling someone fast is the best move. You are not in trouble. The tech team can lock things down and help you reset your password.' },
            { text: 'Delete the email so nobody finds out.', fb: 'Deleting it hides evidence that could help protect other students. Report it instead.' }
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      title: 'Lock It Down',
      art: 'lock',
      minutes: 8,
      summary: 'Strong passwords, two-step verification, and the one code you should never share with anyone.',
      doneLine: 'Your accounts are a lot harder to break into now. Next: thinking before you post.',
      steps: [
        { kind: 'cover', nav: 'Welcome', art: 'lock', eyebrow: 'Module 2', title: 'Lock It Down',
          body: 'Your accounts hold your messages, photos, schoolwork, and sometimes money. A few simple habits make them very hard to break into.',
          goals: ['Build a password that would take centuries to crack', 'Understand two-step verification', 'Recognize the "send me your code" trick'],
          meta: [['clock', '8 minutes'], ['target', '5 activities']] },

        { kind: 'lesson', nav: 'Four habits', eyebrow: 'Learn', title: 'Four habits that protect every account',
          points: [
            { icon: 'layers', title: 'Long beats complicated', text: 'Four random words like "maple-sock-rocket-thunder" are stronger and easier to remember than "P@ssw0rd!"' },
            { icon: 'key', title: 'One account, one password', text: 'If you reuse a password and one site gets hacked, every account using it is open.' },
            { icon: 'phone', title: 'Turn on two-step verification', text: 'Even if someone steals your password, they still need the code sent to your phone.' },
            { icon: 'eyeOff', title: 'Codes are never shared', text: 'A login code is a key to your account. Nobody real will ever ask you for it. Not friends, not "support".' }
          ],
          callout: 'Never share your school password with a friend, even a best friend. If they get hacked, or you have a fight, your account goes with them.' },

        { kind: 'password', nav: 'Password lab', eyebrow: 'Lab', title: 'Password lab',
          prompt: 'Type a made-up password and watch how long it would take a computer to guess it. Try the examples to compare.',
          samples: ['Password123!', 'football2012', 'Tr0ub4dor&3', 'purple-tractor-ocean-lamp', 'maple sock rocket thunder 7'],
          body: `<p><strong>Why do short passwords fail?</strong> Hackers do not guess one at a time. Computers can try billions of combinations per second, and they start with common words, names, sports teams, and years.</p>
            <p><strong>Why do passphrases win?</strong> Every extra character multiplies the work. Four random words is long, easy to remember, and very hard to crack.</p>
            <p><strong>Swapping letters for symbols</strong> (like @ for a) does not help much. Cracking tools already know that trick.</p>` },

        { kind: 'choice', nav: 'A friend asks', eyebrow: 'Check your thinking', title: 'When a friend asks for your password',
          question: 'Your best friend asks for your school login so they can "check something real quick" for you. What do you do?',
          options: [
            { text: 'Give it to them. You trust them completely.', fb: 'Trust is not the issue. If their device is hacked or a stranger sees it, your account is exposed. And anything done with your login looks like it was you.' },
            { text: 'Say no, and offer to look it up together on your own device.', correct: true, fb: 'Exactly. You can help them without handing over the keys. Passwords are for one person only.' },
            { text: 'Give it to them and change it later.', fb: 'Most people forget to change it. And a lot can happen before "later."' }
          ] },

        { kind: 'choice', nav: 'The code trick', eyebrow: 'Scenario', title: 'The "wrong number" code trick',
          prompt: 'Read the texts as they come in.',
          visual: { type: 'phone', contact: '(207) 555-0148', sub: 'Unknown number', clock: '9:14',
            messages: [
              { stamp: 'Today 9:12 PM' },
              { from: 'sys', text: 'Your verification code is 482913. Do not share this code with anyone.' },
              { from: 'them', text: 'heyyy sorry!! i think i accidentally put your number when signing up for something' },
              { from: 'them', text: 'can u send me the 6 digit code that just came to ur phone? its for my account' },
              { from: 'them', text: 'pls hurry it expires' }
            ] },
          question: 'What is really happening, and what should you do?',
          options: [
            { text: 'Send it. It sounds like an honest mistake.', fb: 'That code was sent to you because someone is trying to log into YOUR account. Sending it hands it over.' },
            { text: 'Do not send it. Someone is trying to get into my account. Change my password and tell an adult.', correct: true, fb: 'Right. A code sent to your phone is for your account. The "oops, wrong number" story is a script scammers use every day.' },
            { text: 'Ignore it. Nothing bad can happen if you do not reply.', fb: 'Not replying is good, but someone may already have your password. Change it and tell an adult.' }
          ] },

        { kind: 'sort', nav: 'What to share', eyebrow: 'Activity', title: 'Share it or keep it private?',
          prompt: 'Sort each item: is it okay to share in a public profile or game chat, or should it stay private?',
          buckets: [
            { id: 'ok', label: 'Okay to share', desc: 'Nothing private here', color: '#138a4b' },
            { id: 'never', label: 'Keep it private', desc: 'Never post or send it', color: '#c8322b' }
          ],
          items: [
            { text: 'Your favorite sports team', bucket: 'ok', why: 'A general interest like this does not reveal anything private.' },
            { text: 'A login code texted to you', bucket: 'never', why: 'A login code lets someone into your account. Nobody real will ask for it.' },
            { text: 'Your password', bucket: 'never', why: 'Passwords are for one person only, always.' },
            { text: 'Your opinion on a new movie', bucket: 'ok', why: 'Opinions are fine to share. Just be kind.' },
            { text: 'Your home address', bucket: 'never', why: 'Strangers should never be able to find where you live.' },
            { text: 'A drawing you are proud of', bucket: 'ok', why: 'Your own work, with nothing personal in it.' }
          ],
          explain: 'A simple test: could a stranger use it to get into your accounts or find you? If yes, keep it private.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      title: 'Think Before You Post',
      art: 'post',
      minutes: 10,
      summary: 'Your digital footprint, other people\'s privacy, and what to do when a video of your team goes viral.',
      doneLine: 'You know how to protect yourself and other people online. Next: spotting scams and fakes.',
      steps: [
        { kind: 'cover', nav: 'Welcome', art: 'post', eyebrow: 'Module 3', title: 'Think Before You Post',
          body: 'Every post, photo, and comment adds to your digital footprint. It is also part of other people\'s footprints when they are in it.',
          goals: ['Understand why posts are hard to take back', 'Respect other people\'s privacy and consent', 'Know what to do when a post about someone goes too far'],
          meta: [['clock', '10 minutes'], ['target', '5 activities']] },

        { kind: 'lesson', nav: 'Your footprint', eyebrow: 'Learn', title: 'Online is forever. Mostly.',
          prompt: 'Deleting a post does not delete the screenshots, downloads, and reposts that already happened.',
          points: [
            { icon: 'layers', title: 'It sticks around', text: 'Screenshots and reposts live on long after you delete the original.' },
            { icon: 'globe', title: 'Public by default', text: 'Many apps share widely unless you change the settings. Private accounts can still be screenshotted.' },
            { icon: 'users', title: 'Consent matters', text: 'If someone is in your photo or video, it is their footprint too. Ask before you post.' },
            { icon: 'home', title: 'Location clues', text: 'Street signs, jerseys, school logos, and geotags can reveal where someone lives or will be.' }
          ] },

        { kind: 'lesson', nav: 'It went viral', eyebrow: 'Scenario', title: 'The highlight that blew up',
          visual: { type: 'social', handle: 'CoachMillerHV', account: 'Coach Miller', verified: false, color: '#8b1d1d', when: '1d', trending: true,
            views: [1200, 1400000], likes: [80, 212000], comments: [4, 8700], shares: [2, 41000],
            caption: ' Unreal catch by #22 in the 4th to win it! Proud of these guys. <span class="ht">#HarborviewFootball #FridayNightLights</span>',
            replies: [{ u: 'sportsclips_daily', t: 'who is this kid?? need his name' }, { u: 'mainehs_fb', t: 'reposting this everywhere' }] },
          body: `<p>Friday night, your football team wins on a last-second catch. Coach Miller posts the clip on his account.</p>
            <p>By Sunday, it has <strong>over a million views</strong>. Sports pages are reposting it. People in the comments are asking for #22's name and which school he goes to.</p>
            <p>#22 is your teammate, Jordan. Everyone is hyped. But then Jordan texts you.</p>`,
          calloutTone: 'blue', callout: 'Watch the numbers climb. This is how fast a post can leave the people it was meant for.' },

        { kind: 'choice', reflect: true, nav: 'Jordan texts you', eyebrow: 'What would you do?', title: 'Jordan needs help',
          visual: { type: 'phone', contact: 'Jordan', clock: '8:52', avatarColor: '#8b1d1d',
            messages: [
              { stamp: 'Sunday 8:49 PM' },
              { from: 'them', text: 'bro my mom is freaking out about the video' },
              { from: 'them', text: 'i\'m not supposed to be online at all. it\'s a safety thing w my family i can\'t really explain' },
              { from: 'them', text: 'people are commenting my name and our school. what do i do' }
            ] },
          question: 'What would you say or do?',
          options: [
            { text: 'Tell Jordan to relax. It is a great play and it will blow over.', fb: 'It feels supportive, but it ignores what Jordan just told you. Some families have serious safety reasons, like a custody situation or someone they need to stay away from. You do not need to know the reason to take it seriously.' },
            { text: 'Encourage Jordan (or his mom) to tell Coach Miller right away, and offer to go with him.', fb: 'This is the strongest move. Coach can take the post down, and the school can help with reposts. Offering to go along makes it easier to actually do it.' },
            { text: 'Comment on the post asking people to stop sharing it.', fb: 'Your heart is in the right place, but a public comment can draw even more attention to Jordan. Getting an adult involved works better.' },
            { text: 'Repost it with a caption saying "don\'t share this."', fb: 'Reposting spreads it further, even with a warning. Hold off on sharing anything with Jordan in it.' }
          ],
          debrief: 'A good rule: when someone tells you a post about them is a problem, believe them, do not share it further, and help them get to an adult who can act. You do not have to fix it yourself.' },

        { kind: 'choice', multi: true, nav: 'Who can help', eyebrow: 'Check your thinking', title: 'Who could Jordan go to?',
          question: 'Select every person who could actually help get this handled.',
          layout: 'people',
          options: [
            { icon: 'whistle', text: 'Coach Miller', sub: 'Posted it, can take it down', correct: true },
            { icon: 'home', text: 'His mom or another family adult', sub: 'Already knows, can contact school', correct: true },
            { icon: 'heartHand', text: 'School counselor', sub: 'Helps with tough situations', correct: true },
            { icon: 'school', text: 'Principal or athletic director', sub: 'Can act on school posts', correct: true },
            { icon: 'globe', text: 'A stranger online who says they can "get it removed"', sub: 'Offers help in the comments' },
            { icon: 'eyeOff', text: 'Nobody. Just wait it out.', sub: 'Hope it goes away' }
          ],
          explain: 'Any trusted adult, at home or at school, can help. Be careful with strangers online who offer to "remove" content. That is a common scam.' },

        { kind: 'sort', nav: 'Post or not?', eyebrow: 'Activity', title: 'Post it, ask first, or don\'t?',
          prompt: 'For each one, decide what you would do before posting.',
          buckets: [
            { id: 'ok', label: 'Okay to post', color: '#138a4b' },
            { id: 'ask', label: 'Ask first', desc: 'Get permission from everyone in it', color: '#b86e00' },
            { id: 'no', label: 'Don\'t post', color: '#c8322b' }
          ],
          items: [
            { text: 'A photo of a drawing you made', bucket: 'ok', why: 'It is your own work and nobody else is in it.' },
            { text: 'A group photo of your friends at lunch', bucket: 'ask', why: 'Everyone in it gets a say. Some people have reasons you do not know about.' },
            { text: 'A video of a classmate tripping in the hallway', bucket: 'no', why: 'Posting someone\'s embarrassing moment can be bullying, even if it is "just a joke."' },
            { text: 'Reposting the school\'s official post about the team\'s win', bucket: 'ok', why: 'The school already decided it was okay to share publicly.' },
            { text: 'A selfie with your street sign in the background', bucket: 'no', why: 'It tells strangers where you live. Retake it somewhere else.' }
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      title: 'Scams, Fakes & Pressure',
      art: 'scam',
      minutes: 10,
      summary: 'Game scams, impersonation, AI fakes, and what to do if someone online threatens you.',
      doneLine: 'You know the tricks scammers use and how to shut them down. One more module to go.',
      steps: [
        { kind: 'cover', nav: 'Welcome', art: 'scam', eyebrow: 'Module 4', title: 'Scams, Fakes & Pressure',
          body: 'Scammers do not hack computers as much as they hack people. They use excitement, fear, and pressure to get you to act before you think.',
          goals: ['Recognize impersonation and "free stuff" scams', 'Know how to handle AI-generated fakes', 'Know what to do if someone threatens you'],
          meta: [['clock', '10 minutes'], ['target', '6 activities']] },

        { kind: 'lesson', nav: 'Their playbook', eyebrow: 'Learn', title: 'The scammer\'s playbook',
          points: [
            { icon: 'gift', title: 'Bait', text: 'Free skins, gems, gift cards, followers. Something you want, for nothing.' },
            { icon: 'user', title: 'Pretending', text: 'They pose as a friend, a parent with a "new number," a company, or someone your age.' },
            { icon: 'clock', title: 'Pressure', text: '"Hurry," "only you," "don\'t tell anyone." Secrecy and speed are huge red flags.' },
            { icon: 'alert', title: 'Fear', text: 'Threats to delete your account, call the police, or share something about you.' }
          ],
          callout: 'AI can now fake voices, photos, and videos of real people. If a message feels off, even from someone you know, check with them another way before you act.' },

        { kind: 'choice', nav: 'Free gems', eyebrow: 'Scenario', title: 'The giveaway DM',
          visual: { type: 'phone', style: 'dm', contact: 'SkyBlocks_Official_Rewards', clock: '4:20', avatarColor: '#7c3aed',
            messages: [
              { from: 'them', text: 'CONGRATS!! You won our 5,000 Gem giveaway' },
              { from: 'them', html: 'Claim in the next 10 min before it goes to someone else: <span class="fake-link" data-href="http://skyblocks-rewardz.gg/claim">skyblocks-rewardz.gg/claim</span>' },
              { from: 'them', text: 'Just log in with your SkyBlocks username + password to receive' }
            ] },
          question: 'What do you do?',
          options: [
            { text: 'Log in quickly before the timer runs out.', fb: 'That is exactly what the timer is for. You would be handing your login to a fake site.' },
            { text: 'Block and report the account. Real games never ask for your password in a DM.', correct: true, fb: 'Yes. "Official" accounts in DMs, a strange domain, and a request for your password: three red flags in a row.' },
            { text: 'Reply asking if it is real.', fb: 'They will say yes. Scammers do not admit to being scammers.' }
          ] },

        { kind: 'choice', nav: '"Mom, new number"', eyebrow: 'Scenario', title: 'A message from "Mom"',
          visual: { type: 'phone', contact: '(207) 555-0193', sub: 'Unknown number', clock: '12:31',
            messages: [
              { stamp: 'Today 12:30 PM' },
              { from: 'them', text: 'hi sweetie it\'s mom. my phone broke so this is my new number' },
              { from: 'them', text: 'a code is about to come to your phone, can you send it to me? need it to get back into my account' },
              { from: 'them', text: 'quick please, I\'m about to go into a meeting' }
            ] },
          question: 'What is the best move?',
          options: [
            { text: 'Send the code. It is your mom.', fb: 'You do not actually know it is your mom. "New number" plus "send me a code" is a known scam script.' },
            { text: 'Call your mom on her usual number, or ask another family adult, before doing anything.', correct: true, fb: 'Exactly. Verify through a way you already trust. If it really is her, she will understand.' },
            { text: 'Ignore it forever.', fb: 'Not replying is safe, but checking with your mom another way makes sure she is okay and knows about it.' }
          ] },

        { kind: 'choice', multi: true, nav: 'An AI fake', eyebrow: 'Scenario', title: 'A fake picture in the group chat',
          prompt: 'Someone used an AI app to make an embarrassing fake picture of a classmate. It is spreading in a group chat you are in.',
          question: 'Which of these are good moves? Select all that apply.',
          options: [
            { text: 'Do not forward it, react to it, or save it.', correct: true },
            { text: 'Tell a trusted adult at school what is going on.', correct: true },
            { text: 'Report the image in the app.', correct: true },
            { text: 'Check in privately with the classmate to let them know you have their back.', correct: true },
            { text: 'Forward it to a friend to ask if it is real.' },
            { text: 'Reply with a joke so it does not seem like a big deal.' }
          ],
          explain: 'Fake images of real people can seriously hurt them, and creating or sharing some kinds of fakes can break school rules and even the law. Not passing it on, reporting it, and telling an adult is how it stops.' },

        { kind: 'lesson', nav: 'If someone threatens you', eyebrow: 'Important', title: 'If someone online threatens you',
          prompt: 'Sometimes a person online pretends to be your age, builds trust, then asks for photos. Then they threaten to share them unless you send money or more pictures. This is called sextortion, and it is a crime.',
          points: [
            { icon: 'heart', title: 'It is not your fault', text: 'The person threatening you is the one doing something wrong. You will not be in trouble for asking for help.' },
            { icon: 'x', title: 'Stop replying. Do not pay.', text: 'Paying almost never makes it stop. It usually leads to more demands.' },
            { icon: 'camera', title: 'Save the evidence', text: 'Screenshot the messages and the account name before you block. Do not delete everything.' },
            { icon: 'users', title: 'Tell a trusted adult now', text: 'A parent, counselor, teacher, or school resource officer can help right away.' }
          ],
          calloutTone: 'blue', calloutIcon: 'shieldCheck',
          callout: '<b>Free help that works:</b> <b>Take It Down</b> (takeitdown.ncmec.org) helps remove images of people under 18 from the internet. You can also report to the <b>CyberTipline</b> at report.cybertip.org or 1-800-843-5678.' },

        { kind: 'choice', nav: 'Check yourself', eyebrow: 'Check your thinking', title: 'Under pressure',
          question: 'Someone you have been chatting with in a game says they will share screenshots of your messages with your whole school unless you send them a $50 gift card tonight. What do you do?',
          options: [
            { text: 'Send the gift card so it goes away.', fb: 'Paying tells them you will pay again. It almost always leads to more demands.' },
            { text: 'Stop replying, screenshot everything, block them, and tell a trusted adult.', correct: true, fb: 'Yes. Save the proof, cut off contact, and get help. Adults can report this, and you are not in trouble.' },
            { text: 'Delete the game and all the messages.', fb: 'Deleting removes the evidence adults need to help you. Screenshot first, then block.' }
          ] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      title: 'Who Do You Tell?',
      art: 'tell',
      minutes: 6,
      summary: 'Telling is not tattling. Map out your trusted adults and practice when to speak up.',
      doneLine: 'You finished every module. Go get your certificate.',
      steps: [
        { kind: 'cover', nav: 'Welcome', art: 'tell', eyebrow: 'Module 5', title: 'Who Do You Tell?',
          body: 'You do not have to handle scary or confusing stuff online by yourself. The fastest way to fix most problems is telling the right person early.',
          goals: ['Name trusted adults at home and at school', 'Know which situations need an adult right away', 'Feel ready to speak up'],
          meta: [['clock', '6 minutes'], ['target', '4 activities']] },

        { kind: 'choice', multi: true, layout: 'people', nav: 'Your trusted adults', eyebrow: 'Activity', title: 'Build your team',
          prompt: 'A trusted adult is someone who listens, takes you seriously, and can actually help.',
          question: 'Which of these could be trusted adults to tell? Select all that apply.',
          options: [
            { icon: 'home', text: 'Parent or guardian', sub: 'At home', correct: true },
            { icon: 'book', text: 'A teacher you like', sub: 'At school', correct: true },
            { icon: 'heartHand', text: 'School counselor', sub: 'Trained for this', correct: true },
            { icon: 'whistle', text: 'Coach or club advisor', sub: 'After school', correct: true },
            { icon: 'school', text: 'Principal or assistant principal', sub: 'At school', correct: true },
            { icon: 'shield', text: 'School resource officer', sub: 'For safety threats', correct: true },
            { icon: 'globe', text: 'Someone you met online who seems nice', sub: 'Online' },
            { icon: 'eyeOff', text: 'Nobody. Handle it alone.', sub: 'Keep it secret' }
          ],
          rightTitle: 'That is your team.',
          explain: 'Any adult you trust at home or school can help, and if one of them does not listen, tell another. People you only know online are not on this list, even if they seem kind.' },

        { kind: 'sort', nav: 'Tell now or handle it', hint: 'If someone could get hurt, your account is exposed, or a stranger wants to meet, tell an adult right away.', eyebrow: 'Activity', title: 'Tell an adult now, or handle it yourself?',
          prompt: 'Some things you can handle with block, report, and delete. Others need an adult right away. Sort each situation.',
          buckets: [
            { id: 'adult', label: 'Tell an adult right away', desc: 'Safety, threats, or your account was exposed', color: '#c8322b' },
            { id: 'self', label: 'Handle it yourself', desc: 'Block, report, delete, and tell if it keeps happening', color: '#2459d6' }
          ],
          items: [
            { text: 'Someone threatens to share private photos of you', bucket: 'adult', why: 'This is a crime. An adult needs to know immediately.' },
            { text: 'A spam text says you won a prize', bucket: 'self', why: 'Delete it and block the number.' },
            { text: 'You typed your password into a fake site', bucket: 'adult', why: 'Your account is exposed. The school tech team can help lock it down.' },
            { text: 'A classmate is being harassed in a group chat', bucket: 'adult', why: 'Someone is getting hurt. An adult can step in.' },
            { text: 'A random account sends you a follow request', bucket: 'self', why: 'Just decline it. Tell someone if they keep trying.' },
            { text: 'Someone you only know online wants to meet in person', bucket: 'adult', why: 'Never meet up without a trusted adult knowing. Tell someone first.' }
          ] },

        { kind: 'choice', reflect: true, nav: 'Why people stay quiet', eyebrow: 'Reflect', title: 'Why do people keep it to themselves?',
          question: 'What do you think is the biggest reason students do not tell an adult when something goes wrong online?',
          options: [
            { text: 'They are afraid of getting in trouble.', fb: 'Very common. But adults care most about keeping you safe. Asking for help early almost always makes things easier, not worse.' },
            { text: 'They are embarrassed.', fb: 'Totally understandable. Counselors and trusted adults have heard it all, and they will not judge you.' },
            { text: 'They think it is not a big deal.', fb: 'If it is bothering you, it is a big enough deal to mention. Small problems are easier to fix before they grow.' },
            { text: 'They are worried their phone or account will be taken away.', fb: 'This is a real fear. You can start by saying "I need help, and I am scared of losing my phone." Saying it out loud helps.' }
          ],
          debrief: 'Whatever the reason, the answer is the same: telling is not tattling. Telling gets help. If the first adult does not listen, tell another one.' },

        { kind: 'lesson', nav: 'Your checklist', eyebrow: 'Wrap-up', title: 'Your Lighthouse checklist',
          prompt: 'Keep these with you. You are ready.',
          points: [
            { icon: 'eye', title: 'Hover before you click', text: 'Check the real domain on every link.' },
            { icon: 'key', title: 'Never share codes or passwords', text: 'Not with friends, not with "support," not with anyone.' },
            { icon: 'users', title: 'Ask before you post people', text: 'Their footprint, their choice.' },
            { icon: 'clock', title: 'Pressure means pause', text: 'Rushing, secrets, and threats are signs of a scam.' },
            { icon: 'heartHand', title: 'Tell someone early', text: 'Your trusted adults can help, and you are not in trouble.' }
          ] }
      ]
    }
  ]
};
