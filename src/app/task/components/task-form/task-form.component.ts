import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ITask } from '../../task.type';
import { Store } from '@ngrx/store';
import { TaskState } from '@angular/fire/firestore';
import { addTask } from '../../store/task.actions';
import { TaskService } from '../../task.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedStore } from '../../../shared/shared-store';
import { combineLatest, map, merge, switchMap, zip } from 'rxjs';
import { IUser } from '../../../shared/shared.type';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  @Input()
  value!: ITask | null;
  @Input()
  btnText: string | undefined;

  taskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    due_date: new FormControl(''),
    created_at: new FormControl(''),
    status: new FormControl('new'),
    priority: new FormControl('0'),
    assignee_ids: new FormControl<String[]>([]),
    assignees: new FormControl<IUser[]>([])
  });

  selectedAssignees: any = [];
  dropdownSettings: IDropdownSettings = {};

  minDate = new Date().toISOString().slice(0, 10);

  constructor(
    private store: Store<TaskState>,
    private taskService: TaskService,
    private toastsr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedStore: SharedStore
  ) {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    zip(this.taskForm.valueChanges, this.users$).subscribe(([form, users]) => {
      this.taskForm.patchValue({assignees: form.assignee_ids?.map((id ) => users.find((user) => user.id == id)).filter(user => user) as IUser[]}); 
    })
  }

  get users$() {
    return this.sharedStore.users$
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'].currentValue) {
      this.taskForm.patchValue(changes['value'].currentValue);
    }
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  async onSubmit() {
    try {
      this.taskForm.patchValue({
        assignee_ids: this.taskForm.value.assignees?.map((a) => a.id) as String[]
      })
      const {assignees, ...data} = this.taskForm.value;
      if (!this.route.snapshot.paramMap.get('id')) {
        await this.taskService.addTask(data as ITask);
        this.toastsr.success('Add new task successfully');
        this.router.navigate(['/tasks']);
      } else {
        await this.taskService.updateTask(
          this.route.snapshot.paramMap.get('id')!,
          data as ITask
        );
        this.toastsr.success('Update successfully');
      }
    } catch (e: any) {
      this.toastsr.error(e);
    }
  }
}
