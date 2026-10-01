'use strict';
const dialog = document.querySelector('#search-dialog');
const query = document.querySelector('#search-query');
const results = document.querySelector('#search-results');
const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const sections = [...document.querySelectorAll('main section[id]')].map(section => ({ id: section.id, title: section.querySelector('h1,h2').textContent, text: normalize(section.textContent) }));
document.querySelector('#search-open').addEventListener('click', () => { dialog.showModal(); query.focus(); });
document.querySelector('#search-close').addEventListener('click', () => dialog.close());
query.addEventListener('input', () => {
  results.replaceChildren();
  const term = normalize(query.value.trim());
  const matches = term.length >= 2 ? sections.filter(section => section.text.includes(term)) : [];
  document.querySelector('#search-status').textContent = term.length < 2 ? 'Saisissez au moins deux caractères.' : `${matches.length} section${matches.length > 1 ? 's' : ''} trouvée${matches.length > 1 ? 's' : ''}.`;
  matches.forEach(section => { const li = document.createElement('li'); const link = document.createElement('a'); link.href = `#${section.id}`; link.textContent = section.title; link.addEventListener('click', () => { dialog.close(); const heading = document.querySelector(`#${section.id} h1, #${section.id} h2`); heading.tabIndex = -1; heading.focus(); }); li.append(link); results.append(li); });
});
const form = document.querySelector('#interest-form');
const status = document.querySelector('#form-status');
const submit = document.querySelector('#submit-interest');
const endpoint = window.LES_SUPERS_CONFIG?.formEndpoint || '';
const configured = /^https:\/\//.test(endpoint);
if (!configured) { submit.disabled = true; status.textContent = 'Le questionnaire ouvrira prochainement. Vous pouvez déjà explorer la gamme et sélectionner vos shots préférés ; aucune réponse n’est envoyée pour le moment.'; }
document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => { const input = [...form.querySelectorAll('[name="produits"]')].find(input => input.value === button.dataset.product); input.checked = true; document.querySelector('#contact').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); input.focus({ preventScroll: true }); }));
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!configured) return;
  status.dataset.state = '';
  if (!form.querySelector('[name="produits"]:checked')) { status.textContent = 'Sélectionnez au moins un shot.'; status.dataset.state = 'error'; form.querySelector('[name="produits"]').focus(); return; }
  if (!form.reportValidity()) return;
  submit.disabled = true; status.textContent = 'Envoi en cours…';
  const data = new FormData(form); data.set('projet', 'Les Supers');
  // Attribution limitée aux paramètres de campagne, sans transmettre l’URL complète.
  const params = new URLSearchParams(location.search);
  ['utm_source', 'utm_medium', 'utm_campaign'].forEach(key => { if (params.has(key)) data.set(key, params.get(key).slice(0, 200)); });
  const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 15000);
  try { const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: controller.signal }); if (!response.ok) throw new Error('Submission failed'); status.textContent = 'Merci ! Votre intérêt a bien été enregistré. Vos réponses nous aideront à construire la gamme.'; form.reset(); }
  catch { status.dataset.state = 'error'; status.textContent = 'Votre réponse n’a pas pu être envoyée. Réessayez dans un instant.'; }
  finally { clearTimeout(timeout); submit.disabled = false; }
});
