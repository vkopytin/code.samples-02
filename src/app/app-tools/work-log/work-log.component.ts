import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContentEditorModule } from '../../content-editor/content-editor.module';
import { last } from 'rxjs';

@Component({
  selector: 'app-work-log',
  imports: [ContentEditorModule],
  templateUrl: './work-log.component.html',
  styleUrl: './work-log.component.scss',
})
export class WorkLogComponent {
    totalTime: string = '00:00';

    @Input()
    workLog: string = '';

    @Input()
    report: string[] = [];

    @Output()
    workLogChange = new EventEmitter<string>();

    changeWorkLog(event: Event) {
        this.workLog = (event.target as HTMLInputElement).value;
        this.calculateTotalTime();
    }

    lineToTimeEntry(line: string) {
        const [, hour, min] = line.match(/^(\d\d?):(\d\d?)\s*/) || [0, '0', '0'];
        const text = line.replace(/^\d\d?:\d\d?\s*/, '');
        const time = (parseInt(hour) * 60 + parseInt(min)) * 60 * 1000;

        return { time, text };
    }

    calculateTotalTime() {
        const lines = this.workLog.match(/\d\d?:\d\d?.*/g)?.reverse() || [];
        const entries = new Map<string, number>();
        let lastTime = 0;
        for (const line of lines) {
            const { time, text } = this.lineToTimeEntry(line);
            const timeDiff = (lastTime || time) - time;
            const diff = timeDiff;
            lastTime = time;
            if (entries.has(text)) {
                entries.set(text, entries.get(text)! + diff);
            } else {
                entries.set(text, diff);
            }
        }
        const total = Array.from(entries.values()).reduce((a, b) => a + b, 0);
        const totalTime = new Date(total);
        this.totalTime = [totalTime.getUTCHours(), totalTime.getUTCMinutes()].map(v => v.toString().padStart(2, '0')).join(':');
        this.report = Array.from(entries.entries())
            .map(([text, time]) => `${new Date(time).toISOString().substr(11, 5)}:${text}`);
    }
}
