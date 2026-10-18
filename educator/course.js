/* Lighthouse — Educator Course (staff meeting or individual PD) */
const SCHOOL = 'rsu99.org';
const lnk = (href, text, flag) => `<a class="fake-link" data-href="${href}"${flag ? ` data-flag="${flag}"` : ''}>${text}</a>`;

window.COURSE = {
  id: 'educator',
  audience: 'educator',
  chip: 'Educator Course',
  certCode: 'E',
  lockModules: false,
  partner: 'Developed by Harper Steenstra &middot; In partnership with the Maine Department of Education',
  audienceLine: 'All school staff &middot; Facilitated or self-paced',
  eyebrow: 'Educator Course &middot; Professional Learning',
  title: 'What would <em>you</em> do?',
  lead: 'A facilitated cybersecurity session for school staff. Work through real scenarios together, from phishing aimed at payroll to a student video that goes viral, with built-in turn-and-talks and a printable completion certificate.',
  heroMeta: [['clock', 'About 50 minutes'], ['layers', '4 modules'], ['users', 'Built for staff meetings'], ['award', 'PD certificate']],
  heroSecondary: `<a class="btn glass lg" href="#facilitate">${icon('book')} Facilitator guide</a>`,
  certSub: 'Educator Cybersecurity Course',
  certBlurb: 'Each participant completes the course on their own device or signs in after the session to print a professional learning certificate.',
  certBody: 'has successfully completed <b>Lighthouse: Cybersecurity Readiness for Maine Schools</b>, a professional learning course addressing phishing and social engineering, the responsible sharing of student images, the protection of student data, and incident reporting procedures. <b>Approximately 1 contact hour.</b>',
  defaultSchool: '',
  homeExtra: () => `<div class="section-head" id="facilitate"><div><h2>Running this in a staff meeting</h2><p>Project the course from one screen while staff follow along on their own laptops, so each person's completion is recorded for their certificate.</p></div></div>
    <div class="guide-panel"><div><ol class="agenda">
      <li><span class="t">0:00</span><div><b>Welcome and framing</b><span>Why schools are targets. Set norms: no one is being tested, and clicking a phish is not a moral failing.</span></div></li>
      <li><span class="t">0:05</span><div><b>Module 1: Phishing in the school inbox</b><span>Two turn-and-talks. Have staff call out the red flags.</span></div></li>
      <li><span class="t">0:18</span><div><b>Module 2: Student images and viral moments</b><span>The longest discussion. Allow extra time here.</span></div></li>
      <li><span class="t">0:33</span><div><b>Module 3: Protecting student data</b><span>AI tools, sharing settings, and daily habits.</span></div></li>
      <li><span class="t">0:43</span><div><b>Module 4: When something goes wrong</b><span>Reporting chain, student disclosures, and commitments.</span></div></li>
      <li><span class="t">0:50</span><div><b>Certificates</b><span>Everyone who followed along on their own device enters their name and prints or saves the PDF.</span></div></li>
    </ol></div>
    <div class="prose" style="font-size:.95rem">
      <p><strong>Before the meeting.</strong> Open each module and read the <em>Facilitator notes</em> under each step. Fill in your district's real help desk contact and media opt-out procedure so you can answer questions on the spot.</p>
      <p><strong>Group session vs. on my own.</strong> Use the toggle in the top bar. In a group session, discussion steps show a projected timer. On their own, staff get private reflection boxes instead.</p>
      <p><strong>Present mode</strong> hides the sidebar and enlarges the text for projection.</p>
      <p><strong>Previewing.</strong> Educator modules are never locked, so you can jump straight to any discussion.</p>
      <div class="callout blue">${icon('info')}<div>Scenarios use a fictional district, RSU 99 in the town of Harborview, so staff can discuss openly. Every email, domain, and person in this course is invented.</div></div>
    </div></div>`,

  modules: [
    /* ------------------------------------------------------------------ */
    {
      title: 'Phishing in the School Inbox',
      art: 'phish',
      minutes: 13,
      summary: 'Gift card requests, payroll redirects, and fake shared documents. Sort a staff inbox and practice your response.',
      doneLine: 'Your staff now knows what to look for and where to report it.',
      steps: [
        { kind: 'cover', nav: 'Welcome', art: 'phish', eyebrow: 'Module 1', title: 'Phishing in the School Inbox',
          body: 'Schools hold payroll, student records, and health information, and staff are busy. That combination makes school inboxes a favorite target for scammers.',
          goals: ['Recognize the scams that target school staff specifically', 'Check a sender and link in seconds', 'Know the first three things to do after a bad click'],
          meta: [['clock', '13 minutes'], ['talk', '2 turn-and-talks']],
          notes: 'Open by saying this out loud: "Nobody in this room is being tested. Smart, careful people click phishing links every day, because the emails are designed by professionals. Our goal is fast reporting, not perfection."' },

        { kind: 'lesson', nav: 'Why schools', eyebrow: 'Learn', title: 'What attackers want from a school',
          prompt: 'Most attacks on schools do not start with a hacker breaking in. They start with an email that gets a staff member to open the door.',
          points: [
            { icon: 'gift', title: 'Gift card and favor requests', text: 'A message that seems to come from a principal or superintendent asks you to quietly buy gift cards.' },
            { icon: 'database', title: 'Payroll redirects', text: 'A fake HR or payroll message asks you to "confirm" your bank info so your next paycheck goes to the scammer.' },
            { icon: 'file', title: 'Fake shared documents', text: '"A colleague shared IEP updates with you." The link opens a fake sign-in page that steals your password.' },
            { icon: 'phone', title: 'MFA fatigue', text: 'Your phone suddenly buzzes with sign-in approval prompts you did not start. Approving even one lets the attacker in.' }
          ],
          callout: 'One stolen staff password can expose an entire student information system. That is why reporting quickly matters more than never clicking.',
          notes: 'If your district has had a real incident, consider sharing what happened (without blame) here. Local examples land much harder than national ones.' },

        { kind: 'spot', nav: 'The gift card ask', eyebrow: 'Activity', title: 'A quick favor from the superintendent',
          hint: 'Check the sender address first, then look for anything that asks for money, speed, or secrecy.',
          prompt: 'This arrives at 7:40 AM, right before first period. Click everything that looks suspicious. There are six red flags.',
          visual: { type: 'email', window: 'Harborview Staff Mail', external: false,
            from: { name: 'Dr. Karen Whitfield', addr: 'kwhitfield.supt.office@gmail.com', flag: 'sender', color: '#14305e' },
            subject: 'Quick favor - are you available?', time: '7:40 AM', to: 'me',
            body: `<div class="ext-banner" data-flag="banner">${icon('alert')} This message came from outside your organization.</div>
              <p>Good morning,</p>
              <p><span data-flag="busy">I am in back to back meetings today and can't take calls.</span> I need your help with something time sensitive.</p>
              <p>I want to surprise a few staff members with appreciation gifts. Please <span data-flag="cards">purchase five $100 Apple gift cards, scratch the backs, and email me photos of the codes</span> within the hour.</p>
              <p><span data-flag="reimburse">I will reimburse you personally before end of day.</span></p>
              <p><span data-flag="secret">Please keep this between us so we don't spoil the surprise.</span></p>
              <p>Thanks,<br>Karen</p><div class="sig">Sent from my iPhone</div>` },
          flags: {
            sender: { title: 'Personal Gmail address', text: 'Dr. Whitfield\'s real email would be kwhitfield@rsu99.org. Anyone can make a Gmail with any name.' },
            banner: { title: 'External sender warning', text: 'Your email system flagged this as coming from outside the district. Leaders write to staff from inside.' },
            busy: { title: 'Cannot be reached', text: '"Can\'t take calls" stops you from verifying by phone. That is the point.' },
            cards: { title: 'Gift cards and codes', text: 'No legitimate district purchase works this way. Gift card codes are untraceable cash.' },
            reimburse: { title: 'Personal reimbursement', text: 'Districts have purchasing procedures. "I\'ll pay you back" skips all of them.' },
            secret: { title: 'Secrecy', text: '"Keep this between us" isolates you from anyone who might stop you.' }
          },
          wrap: 'If something like this arrives, do not reply to it. Call the person on a number you already have, or forward it to your help desk using the Report Phishing button.',
          notes: 'Ask the room: "Who has gotten one of these?" Usually several hands go up. Point out that the attacker likely found the superintendent\'s name and staff emails on the district website.' },

        { kind: 'turntalk', nav: 'Turn and talk', title: 'Has a message like this ever reached you?', minutes: 2,
          prompt: 'Has a message like this ever landed in your inbox, or almost fooled you? What made it convincing?',
          stems: ['The one that almost got me was...', 'What made it believable was...', 'What tipped me off was...'],
          share: ['What made the most convincing ones convincing?', 'Did you report it? If not, what stopped you?'],
          notes: 'Listen for "I didn\'t know where to report it." Write those down. They tell you what to fix in your district\'s process.' },

        { kind: 'inbox', nav: 'Sort the inbox', eyebrow: 'Activity', title: 'A Tuesday morning inbox',
          hint: 'Three are phishing. For the parent email, look closely at the attachment\'s file type.',
          prompt: 'Five messages. Some are real, some are not. Open each one, hover over links, check senders and attachments, then report it or mark it safe.',
          window: 'Harborview Staff Mail',
          emails: [
            { from: { name: 'Payroll Department', addr: 'payroll@rsu-99.org', color: '#0e7490' }, time: '7:58 AM', verdict: 'phish',
              subject: 'Action Required: Confirm direct deposit before Friday', preview: 'Due to a system migration, all staff must re-verify...',
              body: `<p>Dear Staff Member,</p><p>Due to a payroll system migration, all employees must <span data-flag="bank">re-verify their direct deposit information</span> <span data-flag="dead">before Friday\'s payroll run or payment may be delayed</span>.</p><p>${lnk('https://rsu-99.org/payroll/verify', '<span class="btnlink">Verify Direct Deposit</span>', 'link')}</p><div class="sig">Harborview Payroll Department</div>`,
              explain: 'Payroll diversion is one of the most common and expensive scams targeting school employees.',
              flags: { bank: { title: 'Asks for bank details', text: 'Payroll changes go through HR in person or a known portal, never an email link.' }, dead: { title: 'Paycheck threat', text: 'A delayed paycheck is a powerful pressure point.' }, link: { title: 'Lookalike domain', text: 'rsu-99.org is not rsu99.org. One dash, completely different owner.' } } },
            { from: { name: 'S. Patel via DocShare', addr: 'no-reply@docshare-files-secure.com', color: '#7c3aed' }, time: '7:31 AM', verdict: 'phish',
              subject: 'Sonia Patel shared "IEP Updates - Q2" with you', preview: 'You have been invited to view a document...',
              body: `<p><b>Sonia Patel</b> (Special Education Director) shared a document with you.</p><p style="border:1px solid #e3e8ef;border-radius:10px;padding:14px;display:flex;gap:10px;align-items:center">${icon('file')} <b>IEP Updates - Q2.pdf</b></p><p>${lnk('https://docshare-files-secure.com/view?doc=IEPQ2', '<span class="btnlink">Open Document</span>', 'link')}</p><p style="font-size:.8rem;color:#8892a6"><span data-flag="login">You will be asked to sign in with your district email and password to view.</span></p>`,
              explain: 'Fake document-sharing alerts use real colleague names, often taken from the staff directory.',
              flags: { link: { title: 'Unknown sharing service', text: 'Your district uses one approved file system. This link goes to docshare-files-secure.com.' }, login: { title: 'Sign-in to view', text: 'The goal is your password. A real share would open in your district account without a separate login page.' } } },
            { from: { name: 'RSU 99 Professional Learning', addr: 'pd@' + SCHOOL, color: '#138a4b' }, time: 'Yesterday', verdict: 'safe',
              subject: 'Registration open: November 3 workshop day', preview: 'Sessions on literacy, SEL, and classroom tech...',
              body: `<p>Hello Harborview staff,</p><p>Registration is now open for the November 3 workshop day. Sessions include literacy across content areas, SEL strategies, and classroom technology.</p><p>${lnk('https://' + SCHOOL + '/pd/nov3', 'View sessions and register')}</p><div class="sig">Office of Curriculum and Professional Learning</div>`,
              explain: 'This is a routine message from inside the district.', good: ['Sent from an @rsu99.org district address', 'Expected: workshop day is on the district calendar', 'The link goes to the district website and does not ask for a password or payment'] },
            { from: { name: 'Jamie Collins', addr: 'jcollins.family@gmail.com', color: '#be185d' }, time: 'Yesterday', verdict: 'phish',
              subject: 'Question about Ava\'s grade', preview: 'Hi, I attached a screenshot of the portal showing...',
              body: `<p>Hi,</p><p>I attached a screenshot of the portal showing Ava\'s grade. Can you take a look and let me know if this is right? <span data-flag="open">You may need to sign in to view it.</span></p>
                <div class="attach" data-flag="attach"><span class="ext">HTML</span> Ava_grade_screenshot.html <span style="color:#8892a6">4 KB</span></div><p style="margin-top:12px">Thanks,<br>Jamie</p>`,
              explain: 'Parents do email from personal accounts, which is what makes this one tricky. The attachment gives it away.',
              flags: { attach: { title: 'A "screenshot" that is a web page', text: 'Screenshots are images (.png or .jpg). An .html attachment opens a fake login page right on your computer.' }, open: { title: 'Sign in to view an attachment', text: 'A screenshot never requires you to sign in.' } } },
            { from: { name: 'RSU 99 Technology', addr: 'helpdesk@' + SCHOOL, color: '#2459d6' }, time: 'Mon', verdict: 'safe',
              subject: 'Scheduled network maintenance Saturday 6 to 9 AM', preview: 'Email and the student information system will be...',
              body: `<p>Email and the student information system will be unavailable Saturday from 6 to 9 AM for scheduled maintenance. No action is needed.</p><p>Reminder: the technology department will <b>never</b> ask for your password by email.</p><div class="sig">Harborview Technology Department &middot; ext. 4400</div>`,
              explain: 'This is a normal IT notice.', good: ['Internal sender address', 'No links or attachments', 'Asks you to do nothing, and even reminds you never to share passwords'] }
          ],
          wrap: 'The hardest ones combine a real name with a fake domain or file. When in doubt, verify through a channel you already trust: a phone extension, Teams or chat, or walking down the hall.',
          notes: 'The parent email gets the most debate. Real parents use Gmail, so the sender alone is not the tell. Spend a minute on why .html attachments are dangerous.' },

        { kind: 'linkpick', nav: 'Which link is fake?', eyebrow: 'Activity', title: 'Checking your pay stub',
          prompt: 'You want to check your pay stub, so you search for the payroll portal. One result is a phishing site. Hover over each, then click the fake one.',
          hint: 'Look for the Sponsored label, and check which results end in rsu99.org.',
          search: 'rsu 99 employee payroll login', ask: 'phish', answer: 0,
          options: [
            { ad: true, site: 'RSU 99 Employee Pay', display: 'rsu99-payroll-login.com', href: 'https://rsu99-payroll-login.com/employee', color: '#7c3aed',
              title: 'RSU 99 Employee Payroll Login | View Pay Stubs', snippet: 'Secure employee access to pay stubs, W-2s, and direct deposit settings. Sign in with your district account.',
              realDomain: 'rsu99-payroll-login.com', why: 'A sponsored ad on a domain the district does not own. Attackers buy ads targeting exactly this search.' },
            { site: 'RSU 99', display: SCHOOL + ' › hr › payroll', href: 'https://' + SCHOOL + '/hr/payroll', color: '#2459d6',
              title: 'Payroll and Pay Stubs - Human Resources', snippet: 'Employees can view pay stubs and tax forms through the employee portal. Contact HR for direct deposit changes.',
              realDomain: SCHOOL, why: 'The district\'s real domain, on the HR page.' },
            { site: 'RSU 99 Human Resources', display: 'hr.' + SCHOOL + ' › benefits', href: 'https://hr.' + SCHOOL + '/benefits', color: '#0e7490',
              title: 'Employee Benefits and Pay Schedule', snippet: '2026-27 pay schedule, benefits enrollment, and HR contacts.',
              realDomain: 'hr.' + SCHOOL, why: '"hr." is part of the real district domain.' }
          ],
          explain: 'Bookmark the portals you use for pay and benefits. Searching for them every time is how staff land on lookalikes.',
          notes: 'Good moment to tell staff the actual URL of your district\'s employee portal, and suggest they bookmark it today.' },

        { kind: 'choice', nav: 'After a bad click', eyebrow: 'Check your thinking', title: 'Ten minutes later, you realize',
          question: 'You realize you entered your district password into a fake sign-in page about ten minutes ago. What do you do first?',
          options: [
            { text: 'Contact the help desk right away and tell them exactly what happened.', correct: true, fb: 'Yes. The help desk can reset your password, end active sessions, and check whether the attacker already got in. Every minute matters.' },
            { text: 'Change your password quietly and hope nobody notices.', fb: 'Changing your password helps, but the attacker may already be signed in or have set up mail forwarding rules. IT needs to know.' },
            { text: 'Wait to see whether anything strange happens.', fb: 'By the time something looks strange, the attacker may have already emailed your contacts or accessed student records.' },
            { text: 'Email your colleagues to warn them.', fb: 'Thoughtful, but if your account is compromised, emails from it may not be trusted. Let IT send the warning.' }
          ] },

        { kind: 'order', nav: 'Response steps', eyebrow: 'Activity', title: 'Put the response in order',
          prompt: 'You clicked a link in a suspicious email and a strange page opened. Drag the steps into the right order, or use the arrows.',
          items: [
            'Stop. Close the page and do not enter anything else.',
            'Call or message the help desk immediately.',
            'Change your password from a trusted device, as IT directs.',
            'Use the Report Phishing button so the email gets pulled from other inboxes.',
            'Let your administrator know, and watch for unusual account activity.'
          ],
          explain: 'Speed matters most at the start. Stop, get IT involved, then lock things down so the same email cannot catch a colleague.',
          notes: 'Remind staff that reporting is never a confession. Districts that thank people for reporting get far more reports, and catch attacks earlier.' },

        { kind: 'turntalk', nav: 'Turn and talk', title: 'Where do we report?', minutes: 2,
          prompt: 'Where would you report a suspicious email in our district? Does everyone at your table know?',
          stems: ['I would report it by...', 'I am not sure whether...', 'It would be easier to report if...'],
          share: ['Facilitator: confirm the official reporting method and help desk contact now.', 'What would make you more likely to report?'],
          notes: 'Have the real answer ready: the button, the email address, and the phone extension. Consider putting it on a slide or a sticky note for every desk.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      title: 'Student Images & Viral Moments',
      art: 'post',
      minutes: 16,
      summary: 'A coach\'s highlight video goes viral, and a parent says their child cannot be online. What happens in the first hour?',
      doneLine: 'This is the conversation most schools never have until it is too late. You have had it now.',
      steps: [
        { kind: 'cover', nav: 'Welcome', art: 'post', eyebrow: 'Module 2', title: 'Student Images & Viral Moments',
          body: 'Celebrating students online builds community. It also creates real risk, because some students have safety, custody, or privacy reasons they cannot be identified publicly.',
          goals: ['Work through a realistic viral-video scenario', 'Know what to check before posting students', 'Plan the first hour when a post needs to come down'],
          meta: [['clock', '16 minutes'], ['talk', '2 turn-and-talks']],
          notes: 'This is the heart of the session. Coaches, advisors, and anyone who runs a class or club account should be in the room for this module.' },

        { kind: 'lesson', nav: 'Friday night', eyebrow: 'Scenario', title: 'The highlight that blew up',
          visual: { type: 'social', handle: 'CoachMillerHV', account: 'Coach Miller', color: '#8b1d1d', when: '1d', trending: true,
            views: [1200, 1400000], likes: [80, 212000], comments: [4, 8700], shares: [2, 41000],
            caption: ' Unreal catch by #22 Jordan B. in the 4th to win it! Proud of these guys. <span class="ht">#HarborviewFootball #FridayNightLights</span>',
            replies: [{ u: 'sportsclips_daily', t: 'what school is this?? need this kid\'s full name' }, { u: 'wcsh_sports', t: 'Can we feature this? DM us' }] },
          body: `<p>Friday night, Harborview wins on a last-second catch. Head coach Mark Miller posts the clip to his <strong>personal account</strong>, tagging the team and naming the player: <strong>"#22 Jordan B."</strong></p>
            <p>By Sunday, the video has <strong>more than a million views</strong>. Sports accounts and a local TV station are asking to share it. Commenters are asking for Jordan's full name and school.</p>
            <p>Sunday evening, an email arrives.</p>`,
          calloutTone: 'blue', callout: 'Watch the counters. This is the speed you are working against once a post leaves your control.',
          notes: 'Let the counters run before you move on. Ask: "At what point in this timeline could anyone still have stopped it?"' },

        { kind: 'choice', reflect: true, nav: 'The parent email', eyebrow: 'What would you do?', title: 'You are Coach Miller',
          visual: { type: 'email', window: 'Harborview Staff Mail', from: { name: 'Dana Brooks', addr: 'dbrooks.home@gmail.com', color: '#be185d' }, time: 'Sun 6:12 PM',
            subject: 'PLEASE take the video down now', to: 'mmiller@' + SCHOOL,
            body: `<p>Coach Miller,</p><p>Jordan is in the video you posted, and you used his name. <b>There is a protection order in place for our family</b>, and Jordan's location and school cannot be public. We are on the media opt-out list.</p><p>People are now commenting his name and asking what school he goes to. Please take it down immediately and tell me what else you are doing.</p><p>Dana Brooks</p>` },
          question: 'What do you do first?',
          options: [
            { text: 'Take the video down from every account you control right now, then call your athletic director or principal tonight.',
              fb: 'This is the strongest first move. Every minute it stays up, it spreads. Removing it first, then escalating immediately, gets the school working on reposts and on the family\'s safety.' },
            { text: 'Forward the email to the athletic director and wait for guidance before touching the post.',
              fb: 'Involving leadership is right, but waiting can cost hours of spread over a weekend. You can remove your own post now and escalate at the same time.' },
            { text: 'Edit the caption to remove Jordan\'s name but leave the video up, since it is great for the program.',
              fb: 'His face, jersey number, team, and school are all still visible. The family has told you he cannot be identified, and the video does that by itself.' },
            { text: 'Reply to explain that the video is harmless publicity and offer to blur his face in a future post.',
              fb: 'This puts the program\'s publicity ahead of a family\'s stated safety concern. It also leaves the original post up while you discuss it.' }
          ],
          reflectTitle: 'Here is how each choice plays out.',
          debrief: '<b>Recommended path:</b> remove the post from every account you control, notify your administrator immediately (even on a weekend), reply to the family to confirm what you have done, and let the school coordinate takedown requests to reposts and media. Then review why the opt-out list was not checked.',
          notes: 'Have tables commit to an answer before revealing perspectives. The second option is the most common pick, and the most useful to discuss. Ask: "Why does waiting feel safer to us, and who does it actually protect?"' },

        { kind: 'turntalk', nav: 'Turn and talk', title: 'The first hour', minutes: 3,
          prompt: 'It is Sunday at 6:15 PM. Who needs to know, in what order, and what does each person do?',
          stems: ['The first person I would call is...', 'The thing I could do myself right now is...', 'What I would not know how to do is...'],
          share: ['Who in our building manages official school and team social accounts?', 'Where does our media opt-out list live, and who can see it?', 'Who do you call on a weekend?'],
          notes: 'Capture gaps on chart paper. Common gaps: coaches without access to the opt-out list, no weekend contact, and personal accounts used for team content.' },

        { kind: 'lesson', nav: 'What the rules say', eyebrow: 'Learn', title: 'Before you post a student',
          prompt: 'Under FERPA, districts may designate some student information, which can include photos, as "directory information" that can be shared. But families have the right to opt out, and many do for reasons they never have to explain.',
          points: [
            { icon: 'list', title: 'Check the opt-out list, every time', text: 'Before posting any student image, confirm none of the students are on your district\'s media or directory information opt-out list.' },
            { icon: 'school', title: 'Use official accounts', text: 'Post student content from school-managed accounts, not personal ones. The district can then remove it, moderate comments, and keep records.' },
            { icon: 'eyeOff', title: 'Avoid identifying combos', text: 'Full name, jersey number, school, and location together make a student easy to find. Share less than you think you need to.' },
            { icon: 'alert', title: 'Removal is not recall', text: 'Taking a post down stops new views, not reposts and downloads. That is why checking first matters so much.' }
          ],
          calloutIcon: 'info',
          callout: 'Specifics vary by district policy. Confirm your district\'s media release procedure, opt-out list, and approved accounts with your administrator.',
          notes: 'If you know your district\'s procedure, show it here. If you are not sure whether coaches can access the opt-out list, find out before the session.' },

        { kind: 'choice', multi: true, nav: 'Pre-post checklist', eyebrow: 'Check your thinking', title: 'Your pre-post checklist',
          question: 'Before posting a photo or video that includes students, which should you check? Select all that apply.',
          options: [
            { text: 'Whether any student in it is on the media or directory information opt-out list', correct: true },
            { text: 'That you are posting from an official, school-managed account', correct: true },
            { text: 'Whether the caption or image identifies students by full name, location, or other details', correct: true },
            { text: 'Your district\'s social media policy', correct: true },
            { text: 'Whether the students in it said it was okay', sub: '' },
            { text: 'Whether it is likely to get a lot of engagement' }
          ],
          explain: 'A student saying "sure, post it" does not override a parent\'s opt-out. Many students do not know their family\'s reasons. Engagement is never a reason to skip the check.',
          notes: 'The "students said it was okay" option sparks good debate. Minors cannot waive a parent\'s opt-out, and students may not know why their family opted out.' },

        { kind: 'sort', nav: 'Post or not?', eyebrow: 'Activity', title: 'Post it, check first, or don\'t?',
          prompt: 'Sort each idea for sharing online.',
          buckets: [
            { id: 'ok', label: 'Fine to post', desc: 'From an official account', color: '#138a4b' },
            { id: 'check', label: 'Check first', desc: 'Opt-out list and policy', color: '#b86e00' },
            { id: 'no', label: 'Don\'t post', color: '#c8322b' }
          ],
          items: [
            { text: 'Student art in the hallway, with no names or faces', bucket: 'ok', why: 'No student is identifiable.' },
            { text: 'Team photo for the official athletics account', bucket: 'check', why: 'Great to share, after confirming no one is on the opt-out list.' },
            { text: 'Video of a student having a hard moment in class', bucket: 'no', why: 'Never. This harms the student and violates their privacy.' },
            { text: 'A photo of your class roster to celebrate perfect attendance', bucket: 'no', why: 'A roster of names is student record information. Celebrate without the list.' },
            { text: 'Honor roll names on the school website', bucket: 'check', why: 'Often allowed as directory information, unless a family has opted out.' },
            { text: 'Field trip photos on your personal Instagram', bucket: 'no', why: 'Use official channels. Personal accounts are outside district control and policy.' },
            { text: 'The empty gym decorated for the dance', bucket: 'ok', why: 'No students in it. Post away.' }
          ],
          notes: 'Expect pushback on personal accounts, since many coaches and advisors use them. Acknowledge that it is common, then return to why: the district cannot remove or moderate what it does not control.' },

        { kind: 'choice', reflect: true, nav: 'A colleague\'s post', eyebrow: 'What would you do?', title: 'When it is not your post',
          question: 'You notice a colleague has posted a photo on their personal account that clearly shows a student you know is on the opt-out list. What do you do?',
          options: [
            { text: 'Message the colleague privately and ask them to take it down.', fb: 'Often the fastest fix, and it preserves the relationship. If they do not act quickly, escalate.' },
            { text: 'Tell your administrator.', fb: 'Appropriate, especially if there is a safety concern or the colleague does not respond. Administrators can act on weekends and with families.' },
            { text: 'Comment on the post asking them to remove it.', fb: 'Public comments draw more attention to the student. Use a private channel.' },
            { text: 'Say nothing. It is not your post.', fb: 'Understandable, but the student\'s safety is a shared responsibility. A quiet heads-up can prevent real harm.' }
          ],
          debrief: 'For a student with a known safety concern, do both: a quick private message and a heads-up to your administrator. Speed matters more than etiquette.' },

        { kind: 'turntalk', nav: 'Turn and talk', title: 'One change for our school', minutes: 2,
          prompt: 'What is one change our school should make to how we share student images?',
          stems: ['We should start...', 'We should stop...', 'I need access to...'],
          share: ['Share one idea per table. Facilitator: record these and send them to leadership.'],
          notes: 'Collect these in writing. They are the most valuable output of the session.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      title: 'Protecting Student Data',
      art: 'data',
      minutes: 11,
      summary: 'AI tools, sharing settings, projectors, and sticky notes. Where student data quietly leaks in a normal school day.',
      doneLine: 'Small habits, big protection. One module left.',
      steps: [
        { kind: 'cover', nav: 'Welcome', art: 'data', eyebrow: 'Module 3', title: 'Protecting Student Data',
          body: 'Every day, staff handle grades, IEPs, 504 plans, health notes, and home addresses. Most leaks are not hacks. They are ordinary moments in a busy day.',
          goals: ['Use AI and other tools safely with student information', 'Fix risky sharing settings', 'Spot everyday data leaks'],
          meta: [['clock', '11 minutes'], ['talk', '1 turn-and-talk']] },

        { kind: 'lesson', nav: 'Four habits', eyebrow: 'Learn', title: 'Four habits that prevent most leaks',
          points: [
            { icon: 'target', title: 'Minimum necessary', text: 'Share only the student information someone needs to do their job, and nothing more.' },
            { icon: 'shieldCheck', title: 'Approved tools only', text: 'Use apps and AI tools your district has reviewed. Free tools may store or train on what you type.' },
            { icon: 'link', title: 'Check sharing settings', text: '"Anyone with the link" means anyone, including people your link gets forwarded to.' },
            { icon: 'lock', title: 'Lock your screen', text: 'Windows + L, or Control + Command + Q on a Mac, every time you step away.' }
          ] },

        { kind: 'choice', nav: 'AI and IEPs', eyebrow: 'Scenario', title: 'A shortcut for progress notes',
          visual: { type: 'browser', url: '<b>free-ai-writer.app</b>/chat', tab: 'Free AI Writer', lock: true,
            html: `<div style="padding:26px 30px;font-size:.9rem;color:#26324a;min-height:360px;background:#fafbfd">
              <div style="display:flex;gap:10px;align-items:center;margin-bottom:18px"><div class="avatar" style="width:30px;height:30px;font-size:.7rem;background:#7c3aed">AI</div><b>Free AI Writer</b><span style="font-size:.72rem;color:#8892a6;margin-left:auto">No account needed</span></div>
              <div style="background:#fff;border:1px solid #e3e8ef;border-radius:12px;padding:14px;margin-left:50px">Write quarterly IEP progress notes for this student:<br><br><span style="color:#5b6477">Name: Ava M. Collins &middot; DOB 03/14/2014 &middot; Grade 6<br>Disability category: Specific Learning Disability<br>Goal 1: Reading fluency, 85 wcpm by June... <i>(continues)</i></span></div>
              <div style="font-size:.72rem;color:#8892a6;margin-top:20px;text-align:center">By using this service you agree that conversations may be used to improve our models.</div></div>` },
          question: 'A colleague wants to paste a student\'s IEP into a free AI tool to draft progress notes. What is the best advice?',
          options: [
            { text: 'Fine, as long as they delete the chat afterward.', fb: 'Deleting the chat may not delete the data. This tool says it may use conversations for training.' },
            { text: 'Fine, if they remove the student\'s name.', fb: 'Better, but a DOB, grade, disability category, and goals can still identify a student, and the tool is not district approved.' },
            { text: 'Use only a district-approved tool, and leave out identifying details even then.', correct: true, fb: 'Right. Approved tools have data agreements that protect students. Even then, share the minimum necessary.' },
            { text: 'AI tools should never be used by teachers for anything.', fb: 'Too broad. Many districts approve AI tools for planning and drafting. The issue is unapproved tools and student data.' }
          ],
          notes: 'Know your district\'s current AI guidance before this step. If there is none, that is a finding worth sending to leadership.' },

        { kind: 'choice', nav: 'Sharing settings', eyebrow: 'Scenario', title: 'The accommodations spreadsheet',
          visual: { type: 'browser', url: '<b>' + SCHOOL + '</b>/drive/accommodations-p3', tab: 'Period 3 Accommodations', lock: true,
            html: `<div style="position:relative;min-height:380px;background:#eef1f6;padding:30px">
              <div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,#fff 0 28px,#f1f4f9 28px 29px);opacity:.6"></div>
              <div style="position:relative;max-width:440px;margin:0 auto;background:#fff;border-radius:14px;box-shadow:0 20px 50px -20px rgba(0,0,0,.4);padding:22px 24px;font-size:.88rem;color:#26324a">
                <div style="font-weight:750;font-size:1.05rem;margin-bottom:14px">Share "Period 3 Accommodations"</div>
                <div style="border:1px solid #dfe4ec;border-radius:8px;padding:9px 12px;color:#8892a6;margin-bottom:16px">Add people or groups</div>
                <div style="font-weight:700;font-size:.8rem;margin-bottom:8px">General access</div>
                <div style="display:flex;gap:12px;align-items:center;background:#fde9e7;border:1px solid #f4c3be;border-radius:10px;padding:10px 12px">${icon('globe')}<div style="flex:1"><b>Anyone with the link</b><div style="font-size:.76rem;color:#5b6477">Anyone on the internet with the link can edit</div></div><span style="font-weight:700;color:#c8322b">Editor</span></div>
                <div style="display:flex;justify-content:space-between;margin-top:18px"><span style="color:#2459d6;font-weight:700">${icon('link')} Copy link</span><span style="background:#2459d6;color:#fff;border-radius:8px;padding:7px 16px;font-weight:700">Done</span></div></div></div>` },
          question: 'You are about to share this list of student accommodations with a substitute. What should you change?',
          options: [
            { text: 'Nothing. The sub needs it and a link is easiest.', fb: 'That link works for anyone it gets forwarded to, and they can edit student accommodation records.' },
            { text: 'Switch to "Restricted" and add the substitute\'s district account, with view-only access.', correct: true, fb: 'Exactly. Only named people, only viewing, only what they need.' },
            { text: 'Change "Editor" to "Viewer" but keep "Anyone with the link."', fb: 'Better, but anyone with the link can still read every student\'s accommodations.' },
            { text: 'Email the spreadsheet as an attachment instead.', fb: 'Attachments can be forwarded and downloaded forever, and you lose the ability to revoke access.' }
          ] },

        { kind: 'sort', nav: 'Everyday habits', eyebrow: 'Activity', title: 'Fine, risky, or not okay?',
          prompt: 'Sort these everyday moments.',
          buckets: [
            { id: 'ok', label: 'Fine', color: '#138a4b' },
            { id: 'risky', label: 'Risky: fix it', color: '#b86e00' },
            { id: 'no', label: 'Not okay', color: '#c8322b' }
          ],
          items: [
            { text: 'Emailing a parent about their own child\'s progress', bucket: 'ok', why: 'The right person, the right information.' },
            { text: 'Projecting your gradebook while taking attendance', bucket: 'no', why: 'Every student in the room can see everyone else\'s grades.' },
            { text: 'Sending an IEP caseload spreadsheet to your personal Gmail to work at home', bucket: 'no', why: 'Student records now live outside district protection, possibly forever.' },
            { text: 'Leaving your laptop unlocked while you step into the hall', bucket: 'risky', why: 'It takes seconds for someone to see or change something. Lock it every time.' },
            { text: 'Sharing a document with a co-teacher\'s district account', bucket: 'ok', why: 'Named person, district account, legitimate need.' },
            { text: 'Student device passwords on a sticky note taped to the cart', bucket: 'risky', why: 'Anyone walking by can log in as a student. Store them securely.' },
            { text: 'Signing students up for a new free app the district has not approved', bucket: 'no', why: 'Unapproved apps may collect student data without the protections the law requires.' }
          ] },

        { kind: 'turntalk', nav: 'Turn and talk', title: 'Where does data leak?', minutes: 2,
          prompt: 'Where does student data leak in your daily routine? Name one habit you will change.',
          stems: ['A moment I had not thought about is...', 'Starting tomorrow, I will...'],
          share: ['What tools do you wish the district would approve or explain?'] }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      title: 'When Something Goes Wrong',
      art: 'respond',
      minutes: 11,
      summary: 'A ransomware screen, a student disclosure, and a suspicious parent request. Practice the response and leave with a plan.',
      doneLine: 'You have finished the course. Print your certificate for your PD records.',
      steps: [
        { kind: 'cover', nav: 'Welcome', art: 'respond', eyebrow: 'Module 4', title: 'When Something Goes Wrong',
          body: 'Incidents will happen. What separates a small problem from a district-wide crisis is usually how fast the first person speaks up.',
          goals: ['Respond to a ransomware screen', 'Support a student who discloses online exploitation', 'Recognize social engineering through the front office'],
          meta: [['clock', '11 minutes'], ['talk', '1 turn-and-talk']] },

        { kind: 'order', nav: 'Ransomware', eyebrow: 'Activity', title: 'A ransom note on your screen',
          prompt: 'Your classroom computer suddenly shows a full-screen message saying your files are encrypted and demanding payment. Put the response in order.',
          items: [
            'Do not click anything on the message, and do not try to pay.',
            'Disconnect from the network: unplug the cable and turn off Wi-Fi. Leave the computer powered on.',
            'Take a photo of the screen with your phone and note the time.',
            'Call the help desk immediately.',
            'Tell your administrator, then follow IT\'s instructions before using the device again.'
          ],
          explain: 'Disconnecting stops it spreading to other computers. Leaving the machine on helps IT investigate. Then get the right people involved fast.',
          notes: 'Confirm your district\'s guidance. Most IT teams want the device disconnected but left on. Some have different instructions.' },

        { kind: 'choice', nav: 'A student discloses', eyebrow: 'Scenario', title: 'A student stays after class',
          prompt: 'A student lingers after the bell, visibly upset. They tell you someone they met online is threatening to post private pictures of them unless they send $200 tonight.',
          question: 'What is your best response?',
          options: [
            { text: 'Tell them to block the person and delete all the messages.', fb: 'Blocking helps, but deleting destroys evidence that law enforcement and the platform need.' },
            { text: 'Stay calm, tell them it is not their fault, do not view or forward any images, and bring in your administrator or counselor right away according to policy.', correct: true, fb: 'Yes. Your calm response tells the student they did the right thing by telling you. Never view, request, or forward the images. Follow your district\'s reporting procedures.' },
            { text: 'Ask to see the images so you understand how serious it is.', fb: 'Never ask to see, receive, or forward images of a minor, even to help. Leave evidence handling to administrators and law enforcement.' },
            { text: 'Suggest they pay so it goes away quickly.', fb: 'Paying almost always leads to more demands. This is a crime, and adults need to report it.' }
          ],
          explain: 'Resources to share with families: <b>Take It Down</b> (takeitdown.ncmec.org) helps remove images of minors, and the <b>NCMEC CyberTipline</b> (report.cybertip.org, 1-800-843-5678) accepts reports. As school staff, also follow your mandated reporting obligations.',
          notes: 'Pause here. Some staff may have personal experience with this. Remind everyone of your counselor contact and your district\'s mandated reporting procedure.' },

        { kind: 'choice', nav: 'A front office call', eyebrow: 'Scenario', title: 'A "parent" with an urgent update',
          visual: { type: 'email', window: 'Harborview Staff Mail', from: { name: 'Chris Brooks', addr: 'chris.brooks.dad@outlook.com', color: '#334155' }, time: '10:22 AM',
            subject: 'Update contact info + send Jordan\'s schedule', to: 'frontoffice@' + SCHOOL,
            body: `<p>Hi,</p><p>I'm Jordan Brooks's father. We just moved, so please update my phone and email in your system to this address.</p><p>Also, can you send me Jordan's class schedule and bus route? I'm picking him up this week and want to be sure I'm in the right place.</p><p>Thanks,<br>Chris</p>` },
          question: 'What is the right response?',
          options: [
            { text: 'Update the info and send the schedule. Parents have the right to it.', fb: 'Not every parent has the same rights. There may be a custody order or a protection order. And you have not confirmed who this is.' },
            { text: 'Do not change anything or send any information by email. Verify identity and custody status through the student\'s file and known contacts, and involve an administrator.', correct: true, fb: 'Exactly. Requests for a student\'s location or schedule, especially from a new email address, need verification against the records you already have.' },
            { text: 'Reply asking for a photo of their ID.', fb: 'Photos can be faked, and replying confirms you are engaging. Verify through what is already on file.' },
            { text: 'Ignore it.', fb: 'Ignoring it may leave a real safety concern unreported. Flag it to an administrator.' }
          ],
          explain: 'Social engineering does not only target passwords. Schedules, bus routes, and pickup details are some of the most sensitive information a school holds.',
          notes: 'This connects back to Module 2. The same family that asked for the video to come down may now be getting a request like this.' },

        { kind: 'turntalk', nav: 'Turn and talk', title: 'Starting Monday', minutes: 2,
          prompt: 'What is one thing you will do differently starting Monday?',
          stems: ['On Monday, I will...', 'I am going to ask our office about...', 'I want my students to know...'],
          share: ['Each table shares one commitment.'] },

        { kind: 'lesson', nav: 'Quick reference', eyebrow: 'Wrap-up', title: 'Your quick-reference card',
          prompt: 'Screenshot this or print it for your desk.',
          points: [
            { icon: 'flag', title: 'Report, do not reply', text: 'Use the Report Phishing button, or forward suspicious messages to the help desk.' },
            { icon: 'key', title: 'Never share passwords or codes', text: 'IT will never ask. Deny MFA prompts you did not start.' },
            { icon: 'list', title: 'Check the opt-out list', text: 'Before posting any student image, from an official account.' },
            { icon: 'shieldCheck', title: 'Approved tools only', text: 'Especially AI tools. Share only the minimum necessary.' },
            { icon: 'lock', title: 'Lock your screen', text: 'Every time you step away.' },
            { icon: 'phone', title: 'When in doubt, call', text: 'Help desk for technology. Administrator for safety. Counselor for students.' }
          ] }
      ]
    }
  ]
};
