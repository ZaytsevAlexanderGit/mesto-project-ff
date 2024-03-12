(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r)}function o(e){e.target.classList.contains("popup_is-opened")&&n(e.target)}function r(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function c(e,t,n,o){e.likes.some((function(e){return e._id===t}))?(n.classList.add("card__like-button_is-active"),o.textContent=e.likes.length):(n.classList.remove("card__like-button_is-active"),o.textContent=e.likes.length)}function i(e,n,o){var r=T.cloneNode(!0),i=r.querySelector(".card__image"),a=r.querySelector(".card__like-amount"),u=r.querySelector(".card__delete-button"),s=r.querySelector(".card__like-button");return r.querySelector(".card__title").textContent=e.name,i.src=e.link,i.alt="Фото - ".concat(e.name),c(e,o,s,a),i.addEventListener("click",(function(){n.zoom(P,e)})),s.addEventListener("click",(function(){n.like(e._id,s.classList.contains("card__like-button_is-active")).then((function(e){c(e,o,s,a)})).catch((function(e){L(e),t(z)}))})),e.owner._id===o?u.addEventListener("click",(function(){n.delete(e._id,r)})):u.style.visibility="hidden",r}function a(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}function u(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function s(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){n.setCustomValidity(""),a(e,n,t)})),u(n,o,t)}e.d({},{Tp:()=>T,Gr:()=>z,LU:()=>P,W_:()=>L});var l="https://nomoreparties.co/v1/wff-cohort-9/",d="18bb9129-3f51-4697-b5c4-3a78dfed04ce",p="users/me/",f="cards/",m="likes/";function _(e,t){e.name.textContent=t.name,e.about.textContent=t.about,e.avatar.style.backgroundImage="url(".concat(t.avatar,")")}var v,h=function(e,t){return t?fetch(l+f+m+e,{method:"DELETE",headers:{authorization:d}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка сервера: ".concat(e.status))})).then((function(e){return e})):fetch(l+f+m+e,{method:"PUT",headers:{authorization:d}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка сервера: ".concat(e.status))})).then((function(e){return e}))},y={id:"",domElement:""},k="Введенный URL не является картинкой. Введите валидный адрес.",S={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function E(e){return fetch("https://proxy.cors.sh/"+e,{method:"HEAD",headers:{"x-cors-api-key":"temp_6093f581654842f76b43b8b2ab403cf2"}}).then((function(e){return e.headers.get("Content-type").includes("image")})).catch((function(){return!1}))}function b(e,t){e.elements.button.textContent=t}function L(e){re.textContent=e}function q(e,n){b(H,"Да"),t(A),y.id=e,y.domElement=n}function C(e,n){t(e),ee.src=n.link,ee.alt="Фото - ".concat(n.name),te.textContent=n.name}var g=document.querySelector(".popup_type_edit"),j=document.querySelector(".popup_type_new-card"),P=document.querySelector(".popup_type_image"),x=document.querySelector(".popup_type_avatar"),z=document.querySelector(".popup_type_error"),A=document.querySelector(".popup_type_delete"),T=document.querySelector("#card-template").content.querySelector(".card"),w=document.querySelector(".places__list"),D=document.querySelector(".profile__add-button"),O=j.querySelector(".popup__close"),B=document.forms["new-place"],N=B.elements["place-name"],G=B.elements.link,H=document.forms.delete,J=A.querySelector(".popup__close"),M=document.querySelector(".profile__edit-button"),U=g.querySelector(".popup__close"),V=document.querySelector(".profile__edit-avatar"),I=x.querySelector(".popup__close"),R=document.querySelector(".profile__title"),W=document.querySelector(".profile__description"),F=document.querySelector(".profile__image"),K=document.forms["new-avatar"],Q=K.elements.avatar,X=document.forms["edit-profile"],Y=X.elements.name,Z=X.elements.description,$={name:R,about:W,avatar:F},ee=P.querySelector(".popup__image"),te=P.querySelector(".popup__caption"),ne=P.querySelector(".popup__close"),oe=z.querySelector(".popup__close"),re=z.querySelector(".popup__title");!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?a(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),u(n,o,t)}))}))}(t,e)}))}(S),function(e,t){return Promise.all([fetch(l+p,{method:"GET",headers:{authorization:d}}).then((function(e){return e.ok?e.json():Promise.reject("".concat(e.status))})).then((function(e){return e})),fetch(l+f,{method:"GET",headers:{authorization:d}}).then((function(e){return e.ok?e.json():Promise.reject("".concat(e.status))})).then((function(e){return e}))]).then((function(t){var n,o,r=t[0],c=t[1];return _(e,r),n=c,o=r._id,n.forEach((function(e){w.append(i(e,{delete:q,like:h,zoom:C},o))})),r})).catch((function(e){return Promise.reject("Ошибка сервера: ".concat(e))}))}($).then((function(e){v=e._id})).catch((function(e){L(e),t(z)})),M.addEventListener("click",(function(){b(X,"Сохранить"),t(g),Y.value=R.textContent,Z.value=W.textContent,s(X,S)})),g.addEventListener("click",o),U.addEventListener("click",(function(){n(g)})),V.addEventListener("click",(function(){b(K,"Сохранить"),t(x),K.reset(),s(x,S)})),x.addEventListener("click",o),I.addEventListener("click",(function(){n(x)})),X.addEventListener("submit",(function(e){e.preventDefault(),b(e.target,"Сохранение..."),function(e,t){return fetch(l+p,{method:"PATCH",headers:{authorization:d,"Content-type":"application/json"},body:JSON.stringify({name:e.name,about:e.about})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка сервера: ".concat(e.status))})).then((function(e){_(t,e)}))}({name:Y.value,about:Z.value},$).catch((function(e){L(e),t(z)})),n(g)})),K.addEventListener("submit",(function(e){e.preventDefault(),b(e.target,"Сохранение..."),E(Q.value).then((function(e){e?(function(e,t){return fetch(l+p+"avatar/",{method:"PATCH",headers:{authorization:d,"Content-type":"application/json"},body:JSON.stringify({avatar:e.avatar})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка сервера: ".concat(e.status))})).then((function(e){_(t,e)}))}({avatar:Q.value},$).catch((function(e){L(e),t(z)})),n(x)):(n(x),L(k),t(z))}))})),D.addEventListener("click",(function(){b(B,"Сохранить"),t(j),B.reset(),s(B,S)})),B.addEventListener("submit",(function(e){e.preventDefault(),b(e.target,"Сохранение...");var o={name:N.value,link:G.value};E(o.link).then((function(e){var r,c,a,u;e?((r=o,c=i,a={delete:q,like:h,zoom:C},u=v,fetch(l+f,{method:"POST",headers:{authorization:d,"Content-type":"application/json"},body:JSON.stringify({name:r.name,link:r.link})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка сервера: ".concat(e.status))})).then((function(e){return c(e,a,u)}))).then((function(e){return w.prepend(e)})).catch((function(e){L(e),t(z)})),n(j)):(n(j),L(k),t(z))}))})),j.addEventListener("click",o),O.addEventListener("click",(function(){n(j)})),z.addEventListener("click",o),oe.addEventListener("click",(function(){n(z)})),A.addEventListener("click",o),J.addEventListener("click",(function(){n(A)})),H.addEventListener("submit",(function(e){var o;e.preventDefault(),b(e.target,"Обработка запроса..."),(o=y.id,fetch(l+f+o,{method:"DELETE",headers:{authorization:d}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка сервера: ".concat(e.status))})).then((function(e){return e})).catch((function(e){return Promise.reject("Ошибка сервера: ".concat(e.message))}))).then((function(){y.domElement.remove(),n(A)})).catch((function(e){n(A),L(e),t(z)}))})),P.addEventListener("click",o),ne.addEventListener("click",(function(){n(P)}))})();