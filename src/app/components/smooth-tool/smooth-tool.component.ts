import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
  AddNode,
  ProgramPresenter,
  ProgramPresenterAPI,
  RobotSettings,
  InsertionEnum
} from '@universal-robots/contribution-api';
import {SmoothToolNode} from './smooth-tool.node';
import {first} from 'rxjs/operators';

@Component({
  templateUrl: './smooth-tool.component.html',
  styleUrls: ['./smooth-tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SmoothToolComponent implements OnChanges, ProgramPresenter {
  // presenterAPI is optional
  @Input() presenterAPI: ProgramPresenterAPI;

  // robotSettings is optional
  @Input() robotSettings: RobotSettings;
  // contributedNode is optional
  @Input() contributedNode: SmoothToolNode;

  constructor(
    protected readonly translateService: TranslateService,
    protected readonly cd: ChangeDetectorRef
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.robotSettings) {
      if (!changes?.robotSettings?.currentValue) {
        return;
      }

      if (changes?.robotSettings?.isFirstChange()) {
        if (changes?.robotSettings?.currentValue) {
          this.translateService.use(changes?.robotSettings?.currentValue?.language);
        }
        this.translateService.setDefaultLang('en');
      }

      this.translateService
        .use(changes?.robotSettings?.currentValue?.language)
        .pipe(first())
        .subscribe(() => {
          this.cd.detectChanges();
        });
    }
  }

  // call saveNode to save node parameters
  async saveNode() {
    this.cd.detectChanges();
    await this.presenterAPI.programNodeService.updateNode(this.contributedNode);
  }

  async createChild() {
    const approachNode = await this.presenterAPI.builder.createNode('smooth-robotics-smooth-tools-approach');
    const nodeID = this.presenterAPI.selectedNodeId;

    await this.presenterAPI.programNodeService.addChildNode({
      insertionRelativeToPivotNode: InsertionEnum.INTO_LAST,
      pivotNodeId: nodeID,
      node: approachNode,
    } as AddNode);
  }
}
