/**
 *
 * @authors zongyuan.ning (you@example.org)
 * @date    2018-10-11 17:43:55
 * @version 1.0.0
 */

class Notify {
    init(params) {
        if (!params) {
            return;
        }
        let self = this,
            themeStyles = {},
            notify = document.getElementById('notify'),
            fakeDiv = document.createElement('div'),
            fakeSpan = document.createElement('span');

        let divStyles = {
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            textAlign: 'center',
            opacity: 0,
            cursor: 'pointer',
        };

        let spanStyles = {
            flex: 1,
            display: 'inline-block',
            maxWidth: '95%',
            padding: '8px 16px',
            marginTop: '8px',
            border: '1px solid #e2ecf4',
            borderRadius: '2px',
            background: '#fff',
            boxShadow: '0 0 5px 1px rgba(0,0,0,.1)',
            color: '#666',
            fontSize: '12px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            letterSpacing: '1px',
            animation: 'dropDown .3s ease-in-out',
        };

        if (params.theme === 'red') {
            themeStyles = {
                color: '#fff',
                background: 'rgba(245, 34, 45, 0.8)',
                border: '1px solid #f5222d',
            }
        }
        if (params.theme === 'green') {
            themeStyles = {
                color: '#fff',
                background: 'rgba(39, 174, 96, 0.8)',
                border: '1px solid #27ae60',
            }
        }
        if (params.theme === 'orange') {
            themeStyles = {
                color: '#fff',
                background: 'rgba(255, 178, 22, 0.8)',
                border: '1px solid #ffb216',
            }
        }

        fakeDiv.id = 'notify';
        fakeSpan.className = 'notify-item';
        fakeSpan.innerText = params.text;

        self.assignStyles(fakeSpan.style, spanStyles);
        self.assignStyles(fakeSpan.style, themeStyles);
        self.assignStyles(fakeDiv.style, divStyles);

        if (notify === null) {
            notify = fakeDiv;
            fakeDiv.appendChild(fakeSpan)
            document.body.appendChild(fakeDiv);
        } else {
            notify.appendChild(fakeSpan);
        }

        setTimeout(function() {
            self.assignStyles(fakeDiv.style, {
                opacity: 1,
                zIndex: 999999,
                left: 0
            });
        }, 0);

        setTimeout(function() {
            self.assignStyles(fakeSpan.style, {
                animation: 'fadeUp .25s linear',
            });
        }, Number(params.time) || 3000);

        setTimeout(function() {
            let notifyItems = document.querySelectorAll('.notify-item');
            notify.removeChild(fakeSpan);
            notifyItems = document.querySelectorAll('.notify-item');
            if (notifyItems.length === 0) {
                document.body.removeChild(notify);
            }
        }, (Number(params.time) + 250) || 3250);
    }

    assignStyles(target, options) {
        Object.assign(target, options)
    };
}
let notify = new Notify();
export default notify;
